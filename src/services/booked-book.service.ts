import { InternalServerErrorException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateBookedBookDTO } from '@dto/bookedBook/create-booked-book.dto';
import { UpdateBookedBookDTO } from '@dto/bookedBook/update-booked-book.dto';
import { PaginationOptionsDto } from '@dto/pagination/pagination-options.dto';
import { PaginationDto } from '@dto/pagination/pagination.dto';
import { BookedBook } from '@entities/booked-book.entity';
import { PaginationResponse } from '@interfaces/Pagination';
import { returnDbItem } from '@utils/response';

@Injectable()
export class BookedBookService {
  constructor(
    @InjectRepository(BookedBook)
    private bookedBookRepository: Repository<BookedBook>,
  ) {}

  async create(createBookDto: CreateBookedBookDTO) {
    try {
      return await this.bookedBookRepository.save(createBookDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll(
    query: PaginationOptionsDto,
  ): Promise<PaginationResponse<CreateBookedBookDTO>> {
    try {
      const queryBuilder =
        this.bookedBookRepository.createQueryBuilder('booked-book');

      queryBuilder
        .orderBy(query.sortBy, query.order)
        .skip(query.skip)
        .take(query.size)
        .leftJoinAndSelect('booked-book.book', 'book');

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
  async findAllByUserId(
    id: string,
    query: PaginationOptionsDto,
  ): Promise<PaginationResponse<CreateBookedBookDTO>> {
    try {
      const queryBuilder =
        this.bookedBookRepository.createQueryBuilder('booked-book');

      queryBuilder
        .where('user_id = :id', { id })
        .loadAllRelationIds({ relations: ['user'] })
        .orderBy(query.sortBy, query.order)
        .skip(query.skip)
        .take(query.size)
        .leftJoinAndSelect('booked-book.book', 'book');

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

  async findById(id: string) {
    try {
      const item = await this.bookedBookRepository.findOne({
        where: { id },
        relations: ['book', 'user'],
      });

      return returnDbItem(item);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, updateBookDto: UpdateBookedBookDTO) {
    try {
      return await this.bookedBookRepository.update({ id }, updateBookDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  async orderBook(userId: string, bookId: string) {
    try {
      const order: CreateBookedBookDTO = {
        book_id: bookId,
        user_id: userId,
        relevant: true,
        issue_date: undefined,
      };

      return await this.bookedBookRepository.save(order);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  async rejectOrder(userId: string, bookId: string) {
    try {
      // return await this.bookedBookRepository.remove({
      //   where: { user_id: userId, book_id: bookId },
      // });
      return await this.bookedBookRepository.delete({
        user_id: userId,
        book_id: bookId,
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
