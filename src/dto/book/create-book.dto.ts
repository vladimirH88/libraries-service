import { ApiProperty } from '@nestjs/swagger';

import { IsbnExist } from '@decorators/validation/book/book-isbn.decorator';
import { Author } from '@entities/author.entity';
import { Genre } from '@entities/genre.entity';
import { Library } from '@entities/library.entity';
import { IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ description: 'Book name', example: '1000 рецептов из щавеля' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Book description',
    example: 'Сборник рецептов для салатов',
  })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Book isbn', example: '978-5-699-12014-7' })
  @IsString()
  @IsbnExist()
  isbn: string;

  @ApiProperty({ description: 'Library id', example: '1' })
  @IsNumber()
  library: Library;

  @ApiProperty({ description: 'Genre id', example: '2' })
  @IsNumber()
  genre: Genre;

  @ApiProperty({ description: 'Author id', example: '5' })
  @IsNumber()
  author: Author;
}
