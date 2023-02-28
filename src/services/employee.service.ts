import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from '@dto/employee/create-employee.dto';
import { UpdateEmployeeDto } from '@dto/employee/update-employee.dto';
import { Employee } from '@entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    try {
      return await this.employeeRepository.save(createEmployeeDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    try {
      return await this.employeeRepository.find();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findById(id: number) {
    try {
      const item = await this.employeeRepository.findOne({
        where: { id },
        relations: ['role'],
      });
      return item;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findByLogin(login: string) {
    try {
      return await this.employeeRepository.findOne({
        where: { login },
        relations: ['role'],
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.employeeRepository.findOne({
        where: { email },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    try {
      return await this.employeeRepository.update({ id }, updateEmployeeDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number) {
    try {
      return await this.employeeRepository.delete({ id });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
