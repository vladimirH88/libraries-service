import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateEmployeeDto } from 'src/dto/employee/create-employee.dto';
import { EmployeeService } from 'src/services/employee.service';
import { MailerService } from '@nestjs-modules/mailer';
import encryption from 'src/utils/encryption';
import { throwHttpError } from 'src/utils/response';
import { ICredentials } from 'src/types/credentials';
import { ConfigService } from '@nestjs/config';
import { generateConfirmLink } from 'src/utils/generateConfirmLink';

@Injectable()
export class AuthService {
  constructor(
    private employeeService: EmployeeService,
    private jwtService: JwtService,
    private readonly mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async login(dto: CreateEmployeeDto) {
    try {
      const user = await this.validateUser(dto);
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

  async logout(id: number) {
    return this.employeeService.update(id, { refresh_token: null });
  }

  async confirmRegistration(id: number) {
    try {
      const user = await this.employeeService.findById(id);
      await this.employeeService.update(id, { ...user, active: true });
    } catch (error) {
      throwHttpError();
    }
  }

  async createNewEmployee(dto: CreateEmployeeDto) {
    try {
      const candidate = await this.employeeService.findByEmail(dto.email);
      if (candidate) {
        return new HttpException(
          'Пользователь с таким email уже существует',
          HttpStatus.BAD_REQUEST,
        );
      }

      const user = await this.employeeService.create(dto);
      return await this.mailerService
        .sendMail({
          to: user.email,
          subject: 'Подтверждение регистрации',
          from: 'noreply@nestjs.com',
          html: `<main>Здравствуйте, ${user.name}!<br />
        Для окончания регистрации пройдите по <a href=${generateConfirmLink(
          user.id,
        )}>ссылке</a>.</main>`,
        })
        .catch((e) => {
          throw new HttpException(
            `Ошибка работы почты: ${JSON.stringify(e)}`,
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        });
    } catch (error) {
      throwHttpError();
    }
  }

  async registration({ id, login, password }: ICredentials) {
    try {
      const candidate = await this.employeeService.findByLogin(login);
      if (candidate) {
        return new HttpException(
          'Пользователь с таким логином уже существует',
          HttpStatus.BAD_REQUEST,
        );
      }
      const user = await this.employeeService.findById(id);
      const hashPassword = await encryption.encrypt(password);

      await this.employeeService.update(id, {
        ...user,
        active: true,
        password: hashPassword,
        login,
      });

      const tokens = this.generateTokens(user);
      this.updateRefreshToken(id, tokens.refreshToken);

      return { redirectUrl: `/?hash=${tokens.refreshToken}` };
    } catch (error) {
      throwHttpError();
    }
  }

  private generateTokens(user: Partial<CreateEmployeeDto>) {
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

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.employeeService.findById(userId);
    if (!user || !user.refresh_token) {
      throw new ForbiddenException('Access Denied');
    }

    const refreshTokenMatches = await encryption.compare(
      refreshToken,
      user.refresh_token,
    );

    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.generateTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async updateRefreshToken(id: number, refreshToken: string) {
    const hashedRefreshToken = await encryption.encrypt(refreshToken);
    await this.employeeService.update(id, {
      refresh_token: hashedRefreshToken,
    });
  }

  async validateUser(
    dto: CreateEmployeeDto,
  ): Promise<Partial<CreateEmployeeDto>> {
    try {
      const user = await this.employeeService.findByLogin(dto.login);
      if (!user) {
        return null;
      }
      const passwordEquals = await encryption.compare(
        dto.password,
        user.password,
      );
      if (user?.active && passwordEquals) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
