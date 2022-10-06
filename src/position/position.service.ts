import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { Position } from './entities/position.entity';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(Position)
    private positionRepository: Repository<Position>,
  ) {}

  async create(createPositionDto: CreatePositionDto) {
    try {
      await this.positionRepository.save(createPositionDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAll() {
    try {
      await this.positionRepository.find();
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findOne(id: number) {
    try {
      await this.positionRepository.findOneBy({ id });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updatePositionDto: UpdatePositionDto) {
    try {
      await this.positionRepository.update({ id }, updatePositionDto);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async remove(id: number) {
    try {
      await this.positionRepository.delete({ id });
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
