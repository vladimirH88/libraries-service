import { IsBoolean, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsBoolean()
  active: boolean;
}
