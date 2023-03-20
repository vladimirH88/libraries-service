import { ApiProperty } from '@nestjs/swagger';

import {
  loginLengthError,
  loginLength,
  passwordLength,
  passwordLengthError,
} from '@constants/registration';
import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class RegistrationDto {
  @IsNumber()
  id: number;

  @ApiProperty({ description: 'Login', required: false })
  @IsString()
  @MinLength(loginLength.min, { message: loginLengthError })
  @MaxLength(loginLength.max, { message: loginLengthError })
  login: string;

  @ApiProperty({ description: 'Password', required: false })
  @IsString()
  @MinLength(passwordLength.min, { message: passwordLengthError })
  @MaxLength(passwordLength.max, { message: passwordLengthError })
  password: string;
}
