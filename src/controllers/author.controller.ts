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
import { CreateAuthorDto } from '@dto/author/create-author.dto';
import { UpdateAuthorDto } from '@dto/author/update-author.dto';
import { AuthorService } from '@services/author.service';

@ApiTags('Authors')
@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @SwaggerApi('Add a new author', CreateAuthorDto)
  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.create(createAuthorDto);
  }

  @SwaggerApi('Get a list of authors', [CreateAuthorDto])
  @Get()
  findAll() {
    return this.authorService.findAll();
  }

  @SwaggerApi('Get the author by id', CreateAuthorDto)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorService.findOne(id);
  }

  @SwaggerApi('Update the author by id', CreateAuthorDto)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorService.update(id, updateAuthorDto);
  }

  @SwaggerApi('Delete the author by id', CreateAuthorDto)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorService.remove(id);
  }
}
