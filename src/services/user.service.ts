import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateUserDto } from '@dto/user/create-user.dto';
import { UpdateUserDto } from '@dto/user/update-user.dto';
import { User } from '@entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.userRepository.save(createUserDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findById(id: string) {
    try {
      const item = await this.userRepository.findOne({
        where: { id },
        relations: ['role'],
      });
      return item;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      return await this.userRepository.update({ id }, updateUserDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: string) {
    try {
      return await this.userRepository.delete({ id });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findByLogin(login: string) {
    try {
      return await this.userRepository.findOne({
        where: { login },
        relations: ['role'],
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
