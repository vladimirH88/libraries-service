import { Module } from '@nestjs/common';
import { BookService } from '@services/book.service';
import { BookController } from '@controllers/book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '@entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
