import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, IsString } from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty({ description: "Author's name", example: 'Александр' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Patronymic of the author',
    example: 'Сергеевич',
    required: false,
  })
  @IsString()
  @IsOptional()
  patronymic: string;

  @ApiProperty({ description: 'Last name of the author', example: 'Пушкин' })
  @IsString()
  surname: string;
}
