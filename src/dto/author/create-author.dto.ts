import { IsOptional, IsString } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  patronymic: string;

  @IsString()
  surname: string;
}
