import { ApiProperty } from '@nestjs/swagger';

import { IsbnExist } from '@decorators/validation/book/book-isbn.decorator';
import { AbstractEntity } from '@entities/absrtact.entity';
import { IsString, IsUUID } from 'class-validator';

export class CreateBookDto extends AbstractEntity {
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

  @ApiProperty({
    description: 'Library id',
    example: '11111111-1111-1111-1111-111111111111',
  })
  @IsUUID()
  library_id: string;

  @ApiProperty({
    description: 'Genre id',
    example: '11111111-1111-1111-1111-111111111111',
  })
  @IsUUID()
  genre_id: string;

  @ApiProperty({
    description: 'Author id',
    example: '11111111-1111-1111-1111-111111111111',
  })
  @IsUUID()
  author_id: string;
}
