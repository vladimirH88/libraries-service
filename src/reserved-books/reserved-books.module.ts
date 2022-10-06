import { Module } from '@nestjs/common';
import { ReservedBooksService } from './reserved-books.service';
import { ReservedBooksController } from './reserved-books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservedBook } from './entities/reserved-book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReservedBook])],
  controllers: [ReservedBooksController],
  providers: [ReservedBooksService],
})
export class ReservedBooksModule {}
