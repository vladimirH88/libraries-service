import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { returnDbItem } from 'src/utils/response';
import { Repository } from 'typeorm';
import { CreatePositionDto } from '../dto/position/create-position.dto';
import { UpdatePositionDto } from '../dto/position/update-position.dto';
import { Position } from '../entityes/position.entity';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(Position)
    private positionRepository: Repository<Position>,
  ) {}

  async create(createPositionDto: CreatePositionDto) {
    try {
      return await this.positionRepository.save(createPositionDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    try {
      return await this.positionRepository.find();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number) {
    try {
      const item = await this.positionRepository.findOneBy({ id });
      return returnDbItem(item);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(id: number, updatePositionDto: UpdatePositionDto) {
    try {
      await this.positionRepository.update({ id }, updatePositionDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number) {
    try {
      return await this.positionRepository.delete({ id });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
