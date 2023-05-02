import { ApiProperty } from '@nestjs/swagger';

import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBookedBookDTO {
  @ApiProperty({
    description: 'book id',
    example: '92f575b4-51d8-4c72-81e7-d88680871fe4',
  })
  @IsNumber()
  book_id: string;

  @ApiProperty({
    description: 'user id',
    example: '82f575b4-51d8-4c72-75e7-d88680871fe4',
  })
  @IsNumber()
  user_id: string;

  @ApiProperty({ description: 'is the booking relevant' })
  @IsBoolean()
  @IsOptional()
  relevant: boolean;

  @ApiProperty({
    description: 'Date when the book will be returned',
    example: '2022-01-10T07:44:49.245Z',
    required: false,
  })
  @IsString()
  @IsOptional()
  issue_date: Date;
}
