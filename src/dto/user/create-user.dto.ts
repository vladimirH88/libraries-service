import { ApiProperty } from '@nestjs/swagger';

import {
  loginLength,
  loginLengthError,
  passwordLength,
  passwordLengthError,
} from '@constants/registration';
import { AbstractEntity } from '@entities/absrtact.entity';

import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto extends AbstractEntity {
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

  @ApiProperty({
    description: 'Is the user blocked',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
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

  @ApiProperty({ description: 'Password' })
  @IsString()
  @MinLength(passwordLength.min, { message: passwordLengthError })
  @MaxLength(passwordLength.max, { message: passwordLengthError })
  password: string;

  @ApiProperty({ description: 'Login' })
  @IsString()
  @MinLength(loginLength.min, { message: loginLengthError })
  @MaxLength(loginLength.max, { message: loginLengthError })
  login: string;

  role_id: string;

  @ApiProperty({ description: "User's email", example: 'ivano@mail.com' })
  @IsEmail()
  email: string;

  refresh_token?: string | null;
}
