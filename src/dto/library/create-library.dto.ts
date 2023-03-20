import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateLibraryDto {
  @ApiProperty({ description: 'Library name', example: 'Библиотека №1' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Library address',
    example: 'г. Минск, ул. Ленина, д.8 ',
  })
  @IsString()
  address: string;

  @ApiProperty({ description: 'Library phone', example: '+123 29 123 45 789' })
  @IsString()
  phone: string;

  @ApiProperty({ description: 'Library email', example: 'library1@mail.com' })
  @IsOptional()
  @IsEmail()
  email: string;
}
