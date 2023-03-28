import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolesController } from '@controllers/roles.controller';
import { Role } from '@entities/role.entity';
import { RolesService } from '@services/roles.service';

import { AuthAppModule } from './auth/auth-app.module';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), forwardRef(() => AuthAppModule)],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
