import { ApiPropertyOptional } from '@nestjs/swagger';

import { SortOrder } from '@constants/SortOrder';

import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';

export class PaginationOptionsDto {
  @ApiPropertyOptional({ enum: SortOrder, default: SortOrder.ASC })
  @IsEnum(SortOrder)
  @IsOptional()
  readonly order?: SortOrder = SortOrder.ASC;

  @ApiPropertyOptional()
  @IsOptional()
  readonly sortBy?: string = '';

  @ApiPropertyOptional({ minimum: 1, default: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @ApiPropertyOptional({ minimum: 1, default: 10 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly size?: number = 10;

  get skip(): number {
    return (this.page - 1) * this.size;
  }
}
