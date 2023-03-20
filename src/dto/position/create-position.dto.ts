import { ApiProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';

export class CreatePositionDto {
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
