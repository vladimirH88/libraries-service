import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLibraryDto } from './dto/create-library.dto';
import { UpdateLibraryDto } from './dto/update-library.dto';
import { Library } from './entities/library.entity';

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
      throw new BadRequestException();
    }
  }

  async findAll() {
    try {
      return await this.libraryRepository.find();
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findOne(id: number) {
    try {
      return await this.libraryRepository.findOneBy({ id });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateLibraryDto: UpdateLibraryDto) {
    try {
      return await this.libraryRepository.update({ id }, updateLibraryDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async remove(id: number) {
    try {
      return await this.libraryRepository.delete({ id });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
