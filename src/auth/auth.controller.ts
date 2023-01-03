import { Body, Controller, Request, Post, UseGuards } from '@nestjs/common';
import { CreateEmployeeDto } from 'src/employee/dto/create-employee.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('/registration')
  registration(@Body() dto: CreateEmployeeDto) {
    console.log('registration DTO :', dto);
  }
}
