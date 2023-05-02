import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { BookedBookController } from '@controllers/booked-book.controller';
import { BookedBook } from '@entities/booked-book.entity';

import { BookedBookService } from '@services/booked-book.service';

@Module({
  imports: [TypeOrmModule.forFeature([BookedBook])],
  controllers: [BookedBookController],
  providers: [BookedBookService],
})
export class BookedBookModule {}
