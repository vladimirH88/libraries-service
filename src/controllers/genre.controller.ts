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
import { CreateGenreDto } from '@dto/genre/create-genre.dto';
import { UpdateGenreDto } from '@dto/genre/update-genre.dto';
import { GenreService } from '@services/genre.service';

@ApiTags('Genres')
@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @SwaggerApi('Add a new genre', CreateGenreDto)
  @Post()
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genreService.create(createGenreDto);
  }

  @SwaggerApi('get a list of genres', [CreateGenreDto])
  @Get()
  findAll() {
    return this.genreService.findAll();
  }

  @SwaggerApi('Get the genre by id', CreateGenreDto)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genreService.findOne(id);
  }

  @SwaggerApi('Update the genre by id', CreateGenreDto)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
    return this.genreService.update(id, updateGenreDto);
  }

  @SwaggerApi('Delete the genre by id', CreateGenreDto)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genreService.remove(id);
  }
}
