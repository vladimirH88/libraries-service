import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PositionController } from '@controllers/position.controller';
import { Position } from '@entities/position.entity';
import { PositionService } from '@services/position.service';

@Module({
  imports: [TypeOrmModule.forFeature([Position])],
  controllers: [PositionController],
  providers: [PositionService],
})
export class PositionModule {}
