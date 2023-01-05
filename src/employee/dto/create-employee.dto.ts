import {
  IsDate,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Role } from 'src/roles/entities/role.entity';

export class CreateEmployeeDto {
  id: number;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  patronymic: string;

  @IsString()
  surname: string;

  @IsNumber()
  position_id: number;

  @IsNumber()
  library_id: number;

  @IsString()
  employment_date: Date;

  @IsDate()
  @IsOptional()
  fired_date: Date;

  password: string;

  @IsString()
  login: string;

  @IsNumber()
  role: Role;

  @IsEmail()
  email: string;

  active: boolean;
}
