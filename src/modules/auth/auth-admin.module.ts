import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthAdminController } from '@controllers/auth/auth-admin.controller';
import { EmployeeModule } from '@modules/employee.module';
import { AuthAdminService } from '@services/auth/auth-admin.service';
import { AccessTokenStrategy } from '@strategies/accessToken.strategy';
import { RefreshTokenStrategy } from '@strategies/refreshToken.strategy';

@Module({
  imports: [
    forwardRef(() => EmployeeModule),
    PassportModule,
    JwtModule.register({}),
  ],
  providers: [AuthAdminService, AccessTokenStrategy, RefreshTokenStrategy],
  exports: [AuthAdminService, JwtModule],
  controllers: [AuthAdminController],
})
export class AuthAdminModule {}
