import { ApiProperty } from '@nestjs/swagger';

import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateReservedBookDto {
  @ApiProperty({
    description: 'Id of the user who took the book',
    example: 2,
  })
  @IsNumber()
  user_id: number;

  @ApiProperty({
    description: 'Id of the taken book',
    example: 1,
  })
  @IsNumber()
  book_id: number;

  @ApiProperty({
    description: 'The date when the book was taken',
    example: '2022-01-01T07:44:49.245Z',
  })
  @IsString()
  reserved_from: Date;

  @ApiProperty({
    description: 'Date when the book will be returned',
    example: '2022-01-10T07:44:49.245Z',
  })
  @IsString()
  reserved_to: Date;

  @ApiProperty({
    description: 'Date when the book will be reserved',
    example: '2022-01-10T07:44:49.245Z',
    required: false,
  })
  @IsDate()
  @IsOptional()
  return_date: Date;

  @ApiProperty({
    description: 'Has the book been returned',
    example: false,
  })
  @IsBoolean()
  returned: boolean;
}
