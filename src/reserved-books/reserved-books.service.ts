import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReservedBookDto } from './dto/create-reserved-book.dto';
import { UpdateReservedBookDto } from './dto/update-reserved-book.dto';
import { ReservedBook } from './entities/reserved-book.entity';

@Injectable()
export class ReservedBooksService {
  constructor(
    @InjectRepository(ReservedBook)
    private reservedBookRepository: Repository<ReservedBook>,
  ) {}

  async create(createReservedBookDto: CreateReservedBookDto) {
    try {
      return await this.reservedBookRepository.save(createReservedBookDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAll() {
    try {
      return await this.reservedBookRepository.find();
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findOne(id: number) {
    try {
      return await this.reservedBookRepository.findOneBy({ id });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateReservedBookDto: UpdateReservedBookDto) {
    try {
      return await this.reservedBookRepository.update(
        { id },
        updateReservedBookDto,
      );
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async remove(id: number) {
    try {
      return await this.reservedBookRepository.delete({ id });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
