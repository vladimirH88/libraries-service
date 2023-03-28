import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthAppController } from '@controllers/auth/auth-app.controller';
import { RolesModule } from '@modules/roles.module';
import { UserModule } from '@modules/user.module';
import { AuthAppService } from '@services/auth/auth-app.service';
import { AccessTokenStrategy } from '@strategies/accessToken.strategy';
import { RefreshTokenStrategy } from '@strategies/refreshToken.strategy';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => RolesModule),
    PassportModule,
    JwtModule.register({}),
  ],
  providers: [AuthAppService, AccessTokenStrategy, RefreshTokenStrategy],
  exports: [AuthAppService, JwtModule],
  controllers: [AuthAppController],
})
export class AuthAppModule {}
