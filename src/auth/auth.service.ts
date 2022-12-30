import { Injectable } from '@nestjs/common';
import { EmployeeService } from 'src/employee/employee.service';

@Injectable()
export class AuthService {
  constructor(private usersService: EmployeeService) {}

  async validateUser(login: string, pass: string): Promise<any> {
    const user = await this.usersService.findByLogin(login);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
