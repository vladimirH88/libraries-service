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

@Injectable()
export class AuthService {
  constructor(
    private employeeService: EmployeeService,
    private jwtService: JwtService,
  ) {}

  async login(dto: CreateEmployeeDto) {
    const user = await this.validateUser(dto);
    if (!user) {
      throw new UnauthorizedException('Неправильный логин или пароль');
    }
    return this.generateToken(user);
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
    return this.generateToken(user);
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
      if (user && passwordEquals) {
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
