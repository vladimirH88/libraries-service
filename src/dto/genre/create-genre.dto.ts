import { ApiProperty } from '@nestjs/swagger';

import { AbstractEntity } from '@entities/absrtact.entity';

import { IsString } from 'class-validator';

export class CreateGenreDto extends AbstractEntity {
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
