import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateEmployeeDto } from 'src/employee/dto/create-employee.dto';
import { EmployeeService } from 'src/employee/employee.service';
import { MailerService } from '@nestjs-modules/mailer';
import { getConfirmLink } from './constants';
import encryption from 'src/utils/encryption';
import { throwHttpError } from 'src/utils/response';
import { ICredentials } from 'src/types/credentials';

@Injectable()
export class AuthService {
  constructor(
    private employeeService: EmployeeService,
    private jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async login(dto: CreateEmployeeDto) {
    try {
      const user = await this.validateUser(dto);
      if (!user) {
        return new UnauthorizedException('Неправильный логин или пароль');
      }
      return this.generateToken(user);
    } catch (error) {
      throwHttpError();
    }
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
        Для окончания регистрации пройдите по <a href=${getConfirmLink(
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

      return { redirectUrl: '/' };
    } catch (error) {
      throwHttpError();
    }
  }

  private async generateToken(user: Partial<CreateEmployeeDto>) {
    const payload = {
      login: user.login,
      sub: user.id,
      roles: [user.role.name],
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
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
