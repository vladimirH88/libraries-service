import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateEmployeeDto } from 'src/employee/dto/create-employee.dto';
import { EmployeeService } from 'src/employee/employee.service';
import * as bcrypt from 'bcrypt';
import { createPassword } from 'src/utils/passwordGenerator';
import { MailerService } from '@nestjs-modules/mailer';
import { getConfirmLink } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private employeeService: EmployeeService,
    private jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async login(dto: CreateEmployeeDto) {
    const user = await this.validateUser(dto);
    if (!user) {
      throw new UnauthorizedException('Неправильный логин или пароль');
    }
    return this.generateToken(user);
  }

  async confirmRegistration(id: number) {
    try {
      const user = await this.employeeService.findById(id);
      await this.employeeService.update(id, { ...user, active: true });
    } catch (error) {
      throw new HttpException(
        'Что-то пошло не так',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async registration(dto: CreateEmployeeDto) {
    const candidate = await this.employeeService.findByLogin(dto.login);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким логином уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const password = createPassword();
    const hashPassword = await bcrypt.hash(password, 5);

    const user = await this.employeeService.create({
      ...dto,
      password: hashPassword,
    });

    return await this.mailerService
      .sendMail({
        to: user.email,
        subject: 'Подтверждение регистрации',
        from: 'noreply@nestjs.com',
        html: `<main>Здравствуйте, ${dto.name}!<br />
        Учётные данные :<br />
        Логин: ${user.login}<br />
        Пароль: ${password}<br />
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
      const passwordEquals = await bcrypt.compare(dto.password, user.password);
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
