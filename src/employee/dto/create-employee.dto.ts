import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEmployeeDto {
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

  @IsDate()
  employment_date: Date;

  @IsDate()
  @IsOptional()
  fired_date: Date;
}
