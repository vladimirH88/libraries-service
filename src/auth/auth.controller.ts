import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateEmployeeDto } from 'src/employee/dto/create-employee.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/logins')
  login(@Body() dto: CreateEmployeeDto) {
    console.log('login DTO :', dto);
  }

  @Post('/registration')
  registration(@Body() dto: CreateEmployeeDto) {
    console.log('registration DTO :', dto);
  }
}
