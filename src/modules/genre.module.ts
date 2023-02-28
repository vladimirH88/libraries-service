import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GenreController } from '@controllers/genre.controller';
import { Genre } from '@entities/genre.entity';
import { GenreService } from '@services/genre.service';

@Module({
  imports: [TypeOrmModule.forFeature([Genre])],
  controllers: [GenreController],
  providers: [GenreService],
})
export class GenreModule {}
