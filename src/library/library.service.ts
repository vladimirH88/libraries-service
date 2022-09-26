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
    private libraryepository: Repository<Library>,
  ) {}

  async create(createLibraryDto: CreateLibraryDto) {
    try {
      return await this.libraryepository.save(createLibraryDto);
    } catch (e) {
      throw new BadRequestException();
    }
  }

  async findAll() {
    try {
      return await this.libraryepository.find();
    } catch (e) {
      throw new BadRequestException();
    }
  }

  async findOne(id: number) {
    try {
      return await this.libraryepository.findOneBy({ id });
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateLibraryDto: UpdateLibraryDto) {
    try {
      return await this.libraryepository.update({ id }, updateLibraryDto);
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async remove(id: number) {
    try {
      return await this.libraryepository.delete({ id });
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
