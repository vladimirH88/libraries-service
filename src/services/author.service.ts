import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { returnDbItem } from 'src/utils/response';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from '../dto/author/create-author.dto';
import { UpdateAuthorDto } from '../dto/author/update-author.dto';
import { Author } from '../entityes/author.entity';

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
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    try {
      return await this.authorRepository.find();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number) {
    try {
      const item = await this.authorRepository.findOneBy({ id });
      return returnDbItem(item);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    try {
      return await this.authorRepository.update({ id }, updateAuthorDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number) {
    try {
      return await this.authorRepository.delete({ id });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
