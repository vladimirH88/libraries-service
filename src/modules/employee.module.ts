import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmployeeController } from '@controllers/employee.controller';
import { Employee } from '@entities/employee.entity';
import { AuthAdminModule } from '@modules/auth/auth-admin.module';
import { EmployeeService } from '@services/employee.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    forwardRef(() => AuthAdminModule),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
