import { InternalServerErrorException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLibraryDto } from '../dto/library/create-library.dto';
import { UpdateLibraryDto } from '../dto/library/update-library.dto';
import { Library } from '../entityes/library.entity';
import { returnDbItem } from 'src/utils/response';

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

  async findOne(id: number) {
    try {
      const item = await this.libraryRepository.findOneBy({ id });
      return returnDbItem(item);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(id: number, updateLibraryDto: UpdateLibraryDto) {
    try {
      return await this.libraryRepository.update({ id }, updateLibraryDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number) {
    try {
      return await this.libraryRepository.delete({ id });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
