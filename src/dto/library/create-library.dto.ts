import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateLibraryDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsEmail()
  email: string;
}
