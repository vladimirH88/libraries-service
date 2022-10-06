import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private authorRepository: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    try {
      return await this.authorRepository.save(createEmployeeDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAll() {
    try {
      return await this.authorRepository.find();
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findOne(id: number) {
    try {
      return await this.authorRepository.findOneBy({ id });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    try {
      return await this.authorRepository.update({ id }, updateEmployeeDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async remove(id: number) {
    try {
      return await this.authorRepository.delete({ id });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
