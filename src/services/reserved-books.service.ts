import { InternalServerErrorException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateReservedBookDto } from '@dto/reserved-books/create-reserved-book.dto';
import { UpdateReservedBookDto } from '@dto/reserved-books/update-reserved-book.dto';
import { ReservedBook } from '@entities/reserved-book.entity';
import { returnDbItem } from '@utils/response';

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

  async findOne(id: string) {
    try {
      const item = await this.reservedBookRepository.findOneBy({ id });
      return returnDbItem(item);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findByUserId(id: string) {
    try {
      return await this.reservedBookRepository
        .createQueryBuilder('reserved_books')
        .where('user_id = :id', { id })
        .leftJoinAndSelect('reserved_books.book', 'book')
        .leftJoinAndSelect('book.author', 'author')
        .leftJoinAndSelect('book.genre', 'genre')
        .getMany();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, updateReservedBookDto: UpdateReservedBookDto) {
    try {
      return await this.reservedBookRepository.update(
        { id },
        updateReservedBookDto,
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: string) {
    try {
      return await this.reservedBookRepository.delete({ id });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
