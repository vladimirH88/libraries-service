import { forwardRef, Module } from '@nestjs/common';
import { EmployeeService } from '@services/employee.service';
import { EmployeeController } from '@controllers/employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '@entities/employee.entity';
import { AuthModule } from '@modules/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Employee]), forwardRef(() => AuthModule)],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
