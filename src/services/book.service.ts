import { InternalServerErrorException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateBookDto } from '@dto/book/create-book.dto';
import { UpdateBookDto } from '@dto/book/update-book.dto';
import { PaginationOptionsDto } from '@dto/pagination/pagination-options.dto';
import { PaginationDto } from '@dto/pagination/pagination.dto';
import { Book } from '@entities/book.entity';
import { PaginationResponse } from '@interfaces/Pagination';
import { returnDbItem } from '@utils/response';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    try {
      return await this.bookRepository.save(createBookDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll(
    query: PaginationOptionsDto,
  ): Promise<PaginationResponse<CreateBookDto>> {
    try {
      const queryBuilder = this.bookRepository.createQueryBuilder('book');

      queryBuilder
        .orderBy(query.sortBy, query.order)
        .skip(query.skip)
        .take(query.size);

      const itemCount = await queryBuilder.getCount();
      const { entities } = await queryBuilder.getRawAndEntities();

      const paginatedData = new PaginationDto(entities, {
        itemCount,
        pageOptionsDto: query,
      }).getData;

      return paginatedData;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findById(id: number) {
    try {
      const item = await this.bookRepository.findOne({
        where: { id },
        relations: ['library', 'genre', 'author'],
      });
      return returnDbItem(item);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findByIsbn(isbn: string) {
    try {
      const item = await this.bookRepository.findOne({ where: { isbn } });
      return returnDbItem(item);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async matchSearch(match: string) {
    try {
      const likeString = `%${match}%`;
      return await this.bookRepository
        .createQueryBuilder('book')
        .where('name ILIKE :likeString', { likeString })
        .orWhere('description ILIKE :likeString', { likeString })
        .getMany();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    try {
      return await this.bookRepository.update({ id }, updateBookDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number) {
    try {
      return await this.bookRepository.delete({ id });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
