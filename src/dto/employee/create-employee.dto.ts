import { ApiProperty } from '@nestjs/swagger';

import { AbstractEntity } from '@entities/absrtact.entity';

import { IsDate, IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateEmployeeDto extends AbstractEntity {
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

  @ApiProperty({
    description: 'Employee position id',
    example: '92f575b4-51d8-4c72-81e7-d88680871fe4',
  })
  @IsUUID()
  position_id: string;

  @ApiProperty({
    description: 'Employee library id',
    example: '92f575b4-51d8-4c72-81e7-d88680871fe4',
  })
  @IsUUID()
  library_id: string;

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

  @ApiProperty({
    description: "Employee's role id",
    example: '18f2fee2-1e3a-449c-962a-66ad888966c1',
  })
  @IsString()
  role_id: string;

  @ApiProperty({ description: "Employee's email", example: 'ivano@mail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Is employee active', example: false })
  active: boolean;

  refresh_token?: string | null;
}
