import { InternalServerErrorException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateLibraryDto } from '@dto/library/create-library.dto';
import { UpdateLibraryDto } from '@dto/library/update-library.dto';
import { Library } from '@entities/library.entity';
import { returnDbItem } from '@utils/response';

@Injectable()
export class LibraryService {
  constructor(
    @InjectRepository(Library)
    private libraryRepository: Repository<Library>,
  ) {}

  async create(createLibraryDto: CreateLibraryDto) {
    try {
      return await this.libraryRepository.save(createLibraryDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    try {
      return await this.libraryRepository.find();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string) {
    try {
      const item = await this.libraryRepository.findOneBy({ id });
      return returnDbItem(item);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, updateLibraryDto: UpdateLibraryDto) {
    try {
      return await this.libraryRepository.update({ id }, updateLibraryDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: string) {
    try {
      return await this.libraryRepository.delete({ id });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
