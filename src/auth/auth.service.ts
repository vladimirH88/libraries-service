import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateEmployeeDto } from 'src/employee/dto/create-employee.dto';
import { EmployeeService } from 'src/employee/employee.service';
import { Employee } from 'src/employee/entities/employee.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: EmployeeService,
    private jwtService: JwtService,
  ) {}

  async login(user: Employee) {
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
    login: string,
    pass: string,
  ): Promise<Partial<CreateEmployeeDto>> {
    try {
      const user = await this.usersService.findByLogin(login);
      if (!user) {
        return null;
      }
      const passwordEquals = await bcrypt.compare(pass, user.password);
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
