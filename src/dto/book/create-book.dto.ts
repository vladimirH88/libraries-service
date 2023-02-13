import { IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  isbn: string;

  @IsNumber()
  library_id: number;

  @IsNumber()
  genre_id: number;

  @IsNumber()
  author_id: number;
}
