import { InternalServerErrorException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { returnDbItem } from '@utils/response';
import { Repository } from 'typeorm';
import { CreateBookDto } from '@dto/book/create-book.dto';
import { UpdateBookDto } from '@dto/book/update-book.dto';
import { Book } from '@entities/book.entity';

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

  async findAll() {
    try {
      return await this.bookRepository.find();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number) {
    try {
      const item = await this.bookRepository.findOneBy({ id });
      return returnDbItem(item);
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
