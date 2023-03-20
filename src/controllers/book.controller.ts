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
import { CreateBookDto } from '@dto/book/create-book.dto';
import { UpdateBookDto } from '@dto/book/update-book.dto';
import { BookService } from '@services/book.service';

@ApiTags('Books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @SwaggerApi('Add a new book', CreateBookDto)
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @SwaggerApi('Get a list of books', [CreateBookDto])
  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @SwaggerApi('Get the book by id', CreateBookDto)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @SwaggerApi('Update the book by id', CreateBookDto)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @SwaggerApi('Delete the book by id', CreateBookDto)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
