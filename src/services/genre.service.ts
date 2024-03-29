import { InternalServerErrorException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateGenreDto } from '@dto/genre/create-genre.dto';
import { UpdateGenreDto } from '@dto/genre/update-genre.dto';
import { Genre } from '@entities/genre.entity';
import { returnDbItem } from '@utils/response';

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
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    try {
      return await this.genreRepository.find();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string) {
    try {
      const item = await this.genreRepository.findOneBy({ id });
      return returnDbItem(item);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, updateGenreDto: UpdateGenreDto) {
    try {
      return await this.genreRepository.update({ id }, updateGenreDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: string) {
    try {
      return await this.genreRepository.delete({ id });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
