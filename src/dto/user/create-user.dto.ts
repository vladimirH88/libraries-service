import { ApiProperty } from '@nestjs/swagger';

import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: "User's name", example: 'Иван' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Patronymic of the user',
    example: 'Иванович',
    required: false,
  })
  @IsString()
  @IsOptional()
  patronymic: string;

  @ApiProperty({ description: 'Last name of the user', example: 'Иванов' })
  @IsString()
  surname: string;

  @ApiProperty({ description: 'Registration date', example: 'Иванов' })
  @IsDate()
  registration_date: Date;

  @ApiProperty({ description: 'Is the user blocked', example: false })
  @IsBoolean()
  block: boolean;

  @ApiProperty({
    description: 'The date when the user was blocked',
    example: '2023-03-29T07:44:49.245Z',
    required: false,
  })
  @IsDate()
  @IsOptional()
  block_date: Date;

  @ApiProperty({
    description: 'The date when the user was blocked',
    required: false,
  })
  @IsString()
  @IsOptional()
  block_reason: string;
}
