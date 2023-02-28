import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReservedBooksController } from '@controllers/reserved-books.controller';
import { ReservedBook } from '@entities/reserved-book.entity';
import { ReservedBooksService } from '@services/reserved-books.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReservedBook])],
  controllers: [ReservedBooksController],
  providers: [ReservedBooksService],
})
export class ReservedBooksModule {}
