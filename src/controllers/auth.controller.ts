import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Query,
  Render,
  Req,
  UseGuards,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { Request } from 'express';

import { SwaggerApi } from '@decorators/swaggerApi.decorator';
import { RegistrationDto } from '@dto/auth/registration.dto';
import { CreateEmployeeDto } from '@dto/employee/create-employee.dto';
import { AccessTokenGuard } from '@guards/accessToken.guard';
import { RefreshTokenGuard } from '@guards/refreshToken.guard';
import { ICredentials } from '@interfaces/credentials';
import { AuthService } from '@services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() req) {
    return this.authService.login(req);
  }

  @SwaggerApi('Logout the employee', {})
  @UseGuards(AccessTokenGuard)
  @Get('/logout')
  logout(@Req() req: Request) {
    this.authService.logout(req.user['id']);
  }

  @UsePipes(new ValidationPipe({ expectedType: RegistrationDto }))
  @Post('/registration')
  async registration(@Body() req: ICredentials) {
    return await this.authService.registration(req);
  }

  @SwaggerApi('Add a new employee and send a confirmation link', {})
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

  @UseGuards(RefreshTokenGuard)
  @Get('/refresh')
  refreshTokens(@Req() req: Request) {
    const id = req.user['id'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(id, refreshToken);
  }
}
