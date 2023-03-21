import { ApiProperty } from '@nestjs/swagger';

import {
  PaginationMetaDtoParams,
  PaginationResponse,
} from '@interfaces/Pagination';

import { IsArray } from 'class-validator';

import { PaginationMetaDto } from './pagination-meta.dto';

export class PaginationDto<T> extends PaginationMetaDto {
  @IsArray()
  @ApiProperty({ isArray: true })
  readonly data: T[];

  readonly meta: PaginationMetaDto;

  constructor(data: T[], params: PaginationMetaDtoParams) {
    super(params);
    this.data = data;
    this.meta = new PaginationMetaDto(params);
  }

  get getData(): PaginationResponse<T> {
    return { ...this.meta, payload: this.data };
  }
}
