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
import { AdminRegistrationDto } from '@dto/auth/admin-registration.dto';
import { CreateEmployeeDto } from '@dto/employee/create-employee.dto';
import { AccessTokenGuard } from '@guards/accessToken.guard';
import { RefreshTokenGuard } from '@guards/refreshToken.guard';
import { IAdminCredentials } from '@interfaces/credentials';
import { AuthAdminService } from '@services/auth/auth-admin.service';

@ApiTags('Auth admin')
@Controller('auth/admin')
export class AuthAdminController {
  constructor(private authService: AuthAdminService) {}

  @Post('/login')
  login(@Body() req: IAdminCredentials) {
    return this.authService.login(req);
  }

  @SwaggerApi('Logout the employee', {})
  @UseGuards(AccessTokenGuard)
  @Get('/logout')
  logout(@Req() req: Request) {
    this.authService.logout(req.user['id']);
  }

  @SwaggerApi('Registration', AdminRegistrationDto)
  @UsePipes(new ValidationPipe({ expectedType: AdminRegistrationDto }))
  @Post('/registration')
  async registration(@Body() req: IAdminCredentials) {
    return await this.authService.registration(req);
  }

  @SwaggerApi(
    'Add a new employee and send a confirmation link',
    CreateEmployeeDto,
  )
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

  @SwaggerApi('Refresh tokens', {})
  @UseGuards(RefreshTokenGuard)
  @Get('/refresh')
  refreshTokens(@Req() req: Request) {
    const id = req.user['id'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(id, refreshToken);
  }
}
