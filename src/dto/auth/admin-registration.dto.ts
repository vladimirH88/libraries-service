import { ApiProperty } from '@nestjs/swagger';

import {
  loginLengthError,
  loginLength,
  passwordLength,
  passwordLengthError,
} from '@constants/registration';
import { IAdminCredentials } from '@interfaces/credentials';
import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class AdminRegistrationDto implements IAdminCredentials {
  @ApiProperty({ description: 'Employee id', required: false })
  @IsUUID()
  id: string;

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
