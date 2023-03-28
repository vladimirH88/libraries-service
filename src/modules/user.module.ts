import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from '@controllers/user.controller';
import { User } from '@entities/user.entity';
import { UserService } from '@services/user.service';

import { AuthAppModule } from './auth/auth-app.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthAppModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
