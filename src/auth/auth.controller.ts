import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateEmployeeDto } from 'src/employee/dto/create-employee.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() req) {
    return this.authService.login(req);
  }

  @UsePipes(new ValidationPipe({ expectedType: CreateEmployeeDto }))
  @Post('/registration')
  registration(@Body() req) {
    return this.authService.registration(req);
  }
}
