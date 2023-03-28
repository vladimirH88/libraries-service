import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { Request } from 'express';

import { SwaggerApi } from '@decorators/swaggerApi.decorator';
import { CreateUserDto } from '@dto/user/create-user.dto';
import { AccessTokenGuard } from '@guards/accessToken.guard';
import { RefreshTokenGuard } from '@guards/refreshToken.guard';
import { AuthAppService } from '@services/auth/auth-app.service';

@ApiTags('Auth app')
@Controller('auth/app')
export class AuthAppController {
  constructor(private authService: AuthAppService) {}

  @SwaggerApi('Login', {})
  @Post('/login')
  login(@Body() req) {
    return this.authService.login(req);
  }

  @SwaggerApi('Logout the user', {})
  @UseGuards(AccessTokenGuard)
  @Get('/logout')
  logout(@Req() req: Request) {
    this.authService.logout(req.user['id']);
  }

  @SwaggerApi('Registration', CreateUserDto)
  @Post('/registration')
  async registration(@Body() req: CreateUserDto) {
    return await this.authService.registration(req);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('/refresh')
  refreshTokens(@Req() req: Request) {
    const id = req.user['id'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(id, refreshToken);
  }
}
