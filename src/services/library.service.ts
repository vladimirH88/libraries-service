import { InternalServerErrorException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateLibraryDto } from '@dto/library/create-library.dto';
import { UpdateLibraryDto } from '@dto/library/update-library.dto';
import { PaginationOptionsDto } from '@dto/pagination/pagination-options.dto';
import { PaginationDto } from '@dto/pagination/pagination.dto';
import { Library } from '@entities/library.entity';
import { PaginationResponse } from '@interfaces/Pagination';
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

  async findAll(
    query: PaginationOptionsDto,
  ): Promise<PaginationResponse<CreateLibraryDto>> {
    try {
      const queryBuilder = this.libraryRepository.createQueryBuilder('library');

      queryBuilder
        .orderBy(query.sortBy, query.order)
        .skip(query.skip)
        .take(query.size);

      const itemCount = await queryBuilder.getCount();
      const { entities } = await queryBuilder.getRawAndEntities();

      const paginatedData = new PaginationDto(entities, {
        itemCount,
        pageOptionsDto: query,
      }).getData;

      return paginatedData;
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
