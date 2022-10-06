import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
  ) {}

  async create(createGenreDto: CreateGenreDto) {
    try {
      return await this.genreRepository.save(createGenreDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAll() {
    try {
      return await this.genreRepository.find();
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findOne(id: number) {
    try {
      return await this.genreRepository.findOneBy({ id });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateGenreDto: UpdateGenreDto) {
    try {
      return await this.genreRepository.update({ id }, updateGenreDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async remove(id: number) {
    try {
      return await this.genreRepository.delete({ id });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
