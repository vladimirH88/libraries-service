import { InternalServerErrorException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { returnDbItem } from '@utils/response';
import { Repository } from 'typeorm';
import { CreateReservedBookDto } from '@dto/reserved-books/create-reserved-book.dto';
import { UpdateReservedBookDto } from '@dto/reserved-books/update-reserved-book.dto';
import { ReservedBook } from '@entities/reserved-book.entity';

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
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    try {
      return await this.reservedBookRepository.find();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number) {
    try {
      const item = await this.reservedBookRepository.findOneBy({ id });
      return returnDbItem(item);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(id: number, updateReservedBookDto: UpdateReservedBookDto) {
    try {
      return await this.reservedBookRepository.update(
        { id },
        updateReservedBookDto,
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number) {
    try {
      return await this.reservedBookRepository.delete({ id });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
