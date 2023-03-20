import { ApiProperty } from '@nestjs/swagger';

import { IsBoolean, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ description: 'Role name', example: 'User' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Role description',
    example: 'Просмотр и бронирование книг',
  })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Is the role active', example: true })
  @IsBoolean()
  active: boolean;
}
