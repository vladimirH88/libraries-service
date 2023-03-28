import { ApiProperty } from '@nestjs/swagger';

import { AbstractEntity } from '@entities/absrtact.entity';

import { IsString } from 'class-validator';

export class CreatePositionDto extends AbstractEntity {
  @ApiProperty({ description: 'Name of the position', example: 'Библиотекарь' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the position',
    example: 'Учёт книг',
  })
  @IsString()
  description: string;
}
