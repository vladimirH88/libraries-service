import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookController } from '@controllers/book.controller';
import { BookIsbnExistsRule } from '@decorators/validation/book/book-isbn.decorator';
import { Book } from '@entities/book.entity';
import { BookService } from '@services/book.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [BookController],
  providers: [BookService, BookIsbnExistsRule],
})
export class BookModule {}
