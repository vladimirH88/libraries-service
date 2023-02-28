import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import {
  loginLengthError,
  loginLength,
  passwordLength,
  passwordLengthError,
} from '@constants/registration';

export class RegistrationDto {
  @IsNumber()
  id: number;

  @IsString()
  @MinLength(loginLength.min, { message: loginLengthError })
  @MaxLength(loginLength.max, { message: loginLengthError })
  login: string;

  @IsString()
  @MinLength(passwordLength.min, { message: passwordLengthError })
  @MaxLength(passwordLength.max, { message: passwordLengthError })
  password: string;
}
