import { InternalServerErrorException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Role as Roles } from '@constants/Roles';
import { CreateRoleDto } from '@dto/roles/create-role.dto';
import { UpdateRoleDto } from '@dto/roles/update-role.dto';
import { Role } from '@entities/role.entity';
import { returnDbItem } from '@utils/response';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    try {
      return await this.roleRepository.save(createRoleDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    try {
      return await this.roleRepository.find();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string) {
    try {
      const item = await this.roleRepository.findOneBy({ id });
      return returnDbItem(item);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getDefaultUserRole() {
    try {
      return await this.roleRepository.findOneBy({ name: Roles.User });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    try {
      return await this.roleRepository.update({ id }, updateRoleDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
