import { ApiProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';

export class CreateGenreDto {
  @ApiProperty({ description: 'Name of the genre', example: 'Комедия' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the genre',
    example: 'Художественное произведение с юмористическим сюжетом',
  })
  @IsString()
  description: string;
}
