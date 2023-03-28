import { ApiProperty } from '@nestjs/swagger';

import { AbstractEntity } from '@entities/absrtact.entity';

import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateReservedBookDto extends AbstractEntity {
  @ApiProperty({
    description: 'Id of the user who took the book',
    example: '92f575b4-51d8-4c72-81e7-d88680871fe1',
  })
  @IsUUID()
  user_id: string;

  @ApiProperty({
    description: 'Id of the taken book',
    example: '92f575b4-51d8-4c72-81e7-d88680871fe4',
  })
  @IsUUID()
  book_id: string;

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
