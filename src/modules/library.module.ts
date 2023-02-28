import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LibraryController } from '@controllers/library.controller';
import { Library } from '@entities/library.entity';
import { LibraryService } from '@services/library.service';

@Module({
  imports: [TypeOrmModule.forFeature([Library])],
  controllers: [LibraryController],
  providers: [LibraryService],
})
export class LibraryModule {}
