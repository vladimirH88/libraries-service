import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { SwaggerApi } from '@decorators/swaggerApi.decorator';
import { CreatePositionDto } from '@dto/position/create-position.dto';
import { UpdatePositionDto } from '@dto/position/update-position.dto';
import { PositionService } from '@services/position.service';

@ApiTags('Positions')
@Controller('positions')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @SwaggerApi('Add a new position', CreatePositionDto)
  @Post()
  create(@Body() createPositionDto: CreatePositionDto) {
    return this.positionService.create(createPositionDto);
  }

  @SwaggerApi('Get a list of positions', [CreatePositionDto])
  @Get()
  findAll() {
    return this.positionService.findAll();
  }

  @SwaggerApi('Get the position by id', CreatePositionDto)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.positionService.findOne(id);
  }

  @SwaggerApi('Update the position by id', CreatePositionDto)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePositionDto: UpdatePositionDto,
  ) {
    return this.positionService.update(id, updatePositionDto);
  }

  @SwaggerApi('Delete the position by id', CreatePositionDto)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.positionService.remove(id);
  }
}
