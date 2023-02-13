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
import { CreateEmployeeDto } from 'src/dto/employee/create-employee.dto';
import { AuthService } from '../services/auth.service';
import { ICredentials } from 'src/types/credentials';
import { RegistrationDto } from '../dto/auth/registration.dto';
import { RefreshTokenGuard } from '../guards/refreshToken.guard';
import { Request } from 'express';
import { AccessTokenGuard } from '../guards/accessToken.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() req) {
    return this.authService.login(req);
  }

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
