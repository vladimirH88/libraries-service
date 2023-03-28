import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';

import { CreateEmployeeDto } from '@dto/employee/create-employee.dto';
import { Employee } from '@entities/employee.entity';
import { IAdminCredentials } from '@interfaces/credentials';
import { EmployeeService } from '@services/employee.service';
import encryption from '@utils/encryption';
import { generateConfirmLink } from '@utils/generateConfirmLink';
import { throwHttpError } from '@utils/response';

@Injectable()
export class AuthAdminService {
  constructor(
    private employeeService: EmployeeService,
    private jwtService: JwtService,
    private readonly mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async login(dto: IAdminCredentials) {
    try {
      const employee = await this.validateUser(dto);
      if (!employee) {
        return new UnauthorizedException('Неправильный логин или пароль');
      }

      const tokens = this.generateTokens(employee);
      this.updateRefreshToken(employee.id, tokens.refreshToken);
      return tokens;
    } catch (error) {
      throwHttpError();
    }
  }

  async logout(id: string) {
    return this.employeeService.update(id, { refresh_token: null });
  }

  async confirmRegistration(id: string) {
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
          html: `<main>Здравствуйте, !<br />
        Для окончания регистрации пройдите по <a href=${generateConfirmLink(
          user.id,
        )}>ссылке</a>.</main>`,
        })
        .catch((e) => {
          return new HttpException(
            `Ошибка работы почты: ${JSON.stringify(e)}`,
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        });
    } catch (error) {
      throwHttpError();
    }
  }

  async registration({ id, login, password }: IAdminCredentials) {
    try {
      const candidate = await this.employeeService.findByLogin(login);
      if (candidate) {
        return new HttpException(
          'Пользователь с таким логином уже существует',
          HttpStatus.BAD_REQUEST,
        );
      }
      const employee = await this.employeeService.findById(id);
      const hashPassword = await encryption.encrypt(password);

      await this.employeeService.update(id, {
        ...employee,
        active: true,
        password: hashPassword,
        login,
      });

      const tokens = this.generateTokens(employee);
      this.updateRefreshToken(id, tokens.refreshToken);

      // return { redirectUrl: `/?hash=${tokens.refreshToken}` };
      return { redirectUrl: `/libraries/?hash=${tokens.refreshToken}` };
    } catch (error) {
      throwHttpError();
    }
  }

  private generateTokens({ id, login, role }: Employee) {
    const payload = {
      login,
      sub: id,
      roles: [role.name],
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

  async updateRefreshToken(id: string, refreshToken: string) {
    const hashedRefreshToken = await encryption.encrypt(refreshToken);
    await this.employeeService.update(id, {
      refresh_token: hashedRefreshToken,
    });
  }

  async validateUser({
    login,
    password,
  }: IAdminCredentials): Promise<Employee> {
    try {
      const employee = await this.employeeService.findByLogin(login);
      if (!employee) {
        return null;
      }
      const passwordEquals = await encryption.compare(
        password,
        employee.password,
      );
      if (employee?.active && passwordEquals) {
        return employee;
      }
      return null;
    } catch (error) {
      return null;
    }
  }
}
