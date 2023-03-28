import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { SwaggerApi } from '@decorators/swaggerApi.decorator';
import { CreateEmployeeDto } from '@dto/employee/create-employee.dto';
import { UpdateEmployeeDto } from '@dto/employee/update-employee.dto';
import { EmployeeService } from '@services/employee.service';

@ApiTags('Employees')
@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @SwaggerApi('Add a new employee', CreateEmployeeDto)
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @SwaggerApi('Get a list of employees', [CreateEmployeeDto])
  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  @SwaggerApi('Get the employee by id', CreateEmployeeDto)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findById(id);
  }

  @SwaggerApi('Update the employee by id', CreateEmployeeDto)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  @SwaggerApi('Delete the employee by id', CreateEmployeeDto)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(id);
  }
}
