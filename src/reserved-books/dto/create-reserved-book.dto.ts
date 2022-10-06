import { IsBoolean, IsDate, IsNumber, IsOptional } from 'class-validator';

export class CreateReservedBookDto {
  @IsNumber()
  user_id: number;

  @IsNumber()
  book_id: number;

  @IsDate()
  reserved_from: Date;

  @IsDate()
  reserved_to: Date;

  @IsDate()
  @IsOptional()
  return_date: Date;

  @IsBoolean()
  returned: boolean;
}
