import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from '@dto/user/create-user.dto';
import { User } from '@entities/user.entity';
import { IUserCredentials } from '@interfaces/credentials';
import { RolesService } from '@services/roles.service';
import { UserService } from '@services/user.service';
import encryption from '@utils/encryption';
import { throwHttpError } from '@utils/response';

@Injectable()
export class AuthAppService {
  constructor(
    private userService: UserService,
    private roleService: RolesService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(credentials: IUserCredentials) {
    try {
      const user = await this.validateUser(credentials);
      if (!user) {
        return new UnauthorizedException('Неправильный логин или пароль');
      }

      const tokens = this.generateTokens(user);
      this.updateRefreshToken(user.id, tokens.refreshToken);
      return tokens;
    } catch (error) {
      throwHttpError();
    }
  }

  async logout(id: string) {
    return this.userService.update(id, { refresh_token: null });
  }

  async registration(dto: CreateUserDto) {
    try {
      const candidate = await this.userService.findByLogin(dto.login);
      if (candidate) {
        return new HttpException(
          'Пользователь с таким логином уже существует',
          HttpStatus.BAD_REQUEST,
        );
      }

      const hashPassword = await encryption.encrypt(dto.password);

      const defaultRole = await this.roleService.getDefaultUserRole();

      const createdUser = await this.userService.create({
        ...dto,
        password: hashPassword,
        role_id: defaultRole.id,
      });
      const user = await this.userService.findById(createdUser.id);
      const tokens = this.generateTokens(user);
      this.updateRefreshToken(user.id, tokens.refreshToken);

      return tokens;
    } catch (error) {
      throwHttpError();
    }
  }

  private generateTokens(user: User) {
    const payload = {
      login: user.login,
      sub: user.id,
      roles: [user.role.name],
    };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRES_IN'),
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
      }),
    };
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userService.findById(userId);
    if (!user || !user.refresh_token) {
      throw new ForbiddenException('Access Denied');
    }

    const refreshTokenMatches = await encryption.compare(
      refreshToken,
      user.refresh_token,
    );

    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = this.generateTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async updateRefreshToken(id: string, refreshToken: string) {
    const hashedRefreshToken = await encryption.encrypt(refreshToken);
    await this.userService.update(id, {
      refresh_token: hashedRefreshToken,
    });
  }

  async validateUser({ login, password }: IUserCredentials) {
    try {
      const user = await this.userService.findByLogin(login);

      if (!user) {
        return null;
      }
      const passwordEquals = await encryption.compare(password, user.password);
      if (passwordEquals) {
        return user;
      }
      return null;
    } catch (error) {
      return null;
    }
  }
}
