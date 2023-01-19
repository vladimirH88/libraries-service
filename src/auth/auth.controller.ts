import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Query,
  Render,
} from '@nestjs/common';
import { CreateEmployeeDto } from 'src/employee/dto/create-employee.dto';
import { AuthService } from './auth.service';
import { ICredentials } from 'src/types/credentials';
import { RegistrationDto } from './dto/registration.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() req) {
    return this.authService.login(req);
  }

  @UsePipes(new ValidationPipe({ expectedType: RegistrationDto }))
  @Post('/registration')
  async registration(@Body() req: ICredentials) {
    return await this.authService.registration(req);
  }

  @UsePipes(new ValidationPipe({ expectedType: CreateEmployeeDto }))
  @Post('/create-employee')
  createNewEmployee(@Body() req) {
    return this.authService.createNewEmployee(req);
  }

  @Render('./forms/registration/form.pug')
  @Get('/confirm')
  confirm(@Query() { id }: { id: string }) {
    return { id };
  }
}
