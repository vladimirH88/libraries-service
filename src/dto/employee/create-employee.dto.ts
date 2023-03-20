import { ApiProperty } from '@nestjs/swagger';

import { Role } from '@entities/role.entity';
import {
  IsDate,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({ description: 'Employee id', example: 1 })
  id: number;

  @ApiProperty({ description: "Employee's name", example: 'Иван' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Patronymic of the employee',
    example: 'Иванович',
    required: false,
  })
  @IsString()
  @IsOptional()
  patronymic: string;

  @ApiProperty({ description: 'Last name of the employee', example: 'Иванов' })
  @IsString()
  surname: string;

  @ApiProperty({ description: 'Employee position id', example: 32 })
  @IsNumber()
  position_id: number;

  @ApiProperty({ description: 'Employee library id', example: 3 })
  @IsNumber()
  library_id: number;

  @ApiProperty({
    description: 'Date of employment',
    example: '2022-01-01T07:44:49.245Z',
  })
  @IsString()
  employment_date: Date;

  @ApiProperty({
    description: 'Date of employment',
    example: '2023-03-29T07:44:49.245Z',
    required: false,
  })
  @IsDate()
  @IsOptional()
  fired_date: Date;

  password: string;

  login: string;

  @ApiProperty({ description: "Employee's role", example: 'User' })
  @IsNumber()
  role: Role;

  @ApiProperty({ description: "Employee's email", example: 'ivano@mail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Is employee active', example: false })
  active: boolean;

  refresh_token?: string | null;
}
