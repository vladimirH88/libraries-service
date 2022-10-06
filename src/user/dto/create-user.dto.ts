import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  patronymic: string;

  @IsString()
  surname: string;

  @IsDate()
  registration_date: Date;

  @IsBoolean()
  block: boolean;

  @IsDate()
  @IsOptional()
  block_date: Date;

  @IsString()
  @IsOptional()
  block_reason: string;
}
