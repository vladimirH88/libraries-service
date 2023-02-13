import { Module } from '@nestjs/common';
import { RolesService } from '../services/roles.service';
import { RolesController } from '../controllers/roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../entityes/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
