import { InternalServerErrorException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { returnDbItem } from 'src/utils/response';
import { Repository } from 'typeorm';
import { CreateGenreDto } from '../dto/genre/create-genre.dto';
import { UpdateGenreDto } from '../dto/genre/update-genre.dto';
import { Genre } from '../entityes/genre.entity';

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

  async findOne(id: number) {
    try {
      const item = await this.genreRepository.findOneBy({ id });
      return returnDbItem(item);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(id: number, updateGenreDto: UpdateGenreDto) {
    try {
      return await this.genreRepository.update({ id }, updateGenreDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number) {
    try {
      return await this.genreRepository.delete({ id });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
