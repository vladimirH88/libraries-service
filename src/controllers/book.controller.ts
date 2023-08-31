import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { ApiPaginatedResponse } from '@decorators/paginated-response.decorator';
import { SwaggerApi } from '@decorators/swaggerApi.decorator';
import { CreateBookDto } from '@dto/book/create-book.dto';
import { UpdateBookDto } from '@dto/book/update-book.dto';
import { PaginationOptionsDto } from '@dto/pagination/pagination-options.dto';
import { BookService } from '@services/book.service';

@ApiTags('Books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @SwaggerApi('Add a new book', CreateBookDto)
  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    return await this.bookService.create(createBookDto);
  }

  @ApiPaginatedResponse(CreateBookDto)
  @Get()
  async findAll(@Query() query: PaginationOptionsDto) {
    return await this.bookService.findAll(query);
  }

  @SwaggerApi('Get the book by id', CreateBookDto)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.bookService.findById(id);
  }

  @SwaggerApi('Get the book by library id', CreateBookDto)
  @Get('isbn/:id')
  async findByIsbn(@Param('id') id: string) {
    return await this.bookService.findByIsbn(id);
  }

  @SwaggerApi('Get the book by author id', CreateBookDto)
  @Get('author/:id')
  async findByAuthorId(
    @Param('id') id: string,
    @Query() query: PaginationOptionsDto,
  ) {
    return await this.bookService.findManyByField(id, query, 'author_id');
  }

  @SwaggerApi('Get the book by genre id', CreateBookDto)
  @Get('genre/:id')
  async findByGenreId(
    @Param('id') id: string,
    @Query() query: PaginationOptionsDto,
  ) {
    return await this.bookService.findManyByField(id, query, 'genre_id');
  }

  @SwaggerApi('Get the book by library id', CreateBookDto)
  @Get('library/:id')
  async findByLibraryId(
    @Param('id') id: string,
    @Query() query: PaginationOptionsDto,
  ) {
    return await this.bookService.findManyByField(id, query, 'library_id');
  }

  @SwaggerApi('Update the book by id', CreateBookDto)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return await this.bookService.update(id, updateBookDto);
  }

  @SwaggerApi('Delete the book by id', CreateBookDto)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.bookService.remove(id);
  }
}
