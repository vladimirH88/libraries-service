import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmployeeController } from '@controllers/employee.controller';
import { Employee } from '@entities/employee.entity';
import { AuthModule } from '@modules/auth.module';
import { EmployeeService } from '@services/employee.service';

@Module({
  imports: [TypeOrmModule.forFeature([Employee]), forwardRef(() => AuthModule)],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
