import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto) {
    try {
      return await this.authorRepository.save(createAuthorDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAll() {
    try {
      return await this.authorRepository.find();
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findOne(id: number) {
    try {
      return await this.authorRepository.findOneBy({ id });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    try {
      return await this.authorRepository.update({ id }, updateAuthorDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async remove(id: number) {
    try {
      return await this.authorRepository.delete({ id });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
