import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { EmployeeModule } from 'src/employee/employee.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [forwardRef(() => EmployeeModule), PassportModule],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
