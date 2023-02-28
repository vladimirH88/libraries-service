import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EmployeeModule } from '@modules/employee.module';
import { AuthController } from '@controllers/auth.controller';
import { AuthService } from '@services/auth.service';
import { AccessTokenStrategy } from '@strategies/accessToken.strategy';
import { RefreshTokenStrategy } from '@strategies/refreshToken.strategy';

@Module({
  imports: [
    forwardRef(() => EmployeeModule),
    PassportModule,
    JwtModule.register({}),
  ],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
  exports: [AuthService, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
