import { PaginationOptionsDto } from '@dto/pagination/pagination-options.dto';

export interface PaginationMetaDtoParams {
  pageOptionsDto: PaginationOptionsDto;
  itemCount: number;
}

export interface PaginationResponse<T> {
  payload: T[];
  page: number;
  size: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
