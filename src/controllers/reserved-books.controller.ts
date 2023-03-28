import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { SwaggerApi } from '@decorators/swaggerApi.decorator';
import { CreateReservedBookDto } from '@dto/reserved-books/create-reserved-book.dto';
import { UpdateReservedBookDto } from '@dto/reserved-books/update-reserved-book.dto';
import { ReservedBooksService } from '@services/reserved-books.service';

@ApiTags('Reserved-books')
@Controller('reserved-books')
export class ReservedBooksController {
  constructor(private readonly reservedBooksService: ReservedBooksService) {}

  @SwaggerApi('Reserve a book', CreateReservedBookDto)
  @Post()
  create(@Body() createReservedBookDto: CreateReservedBookDto) {
    return this.reservedBooksService.create(createReservedBookDto);
  }

  @SwaggerApi('Get a list of reserved books', [CreateReservedBookDto])
  @Get()
  findAll() {
    return this.reservedBooksService.findAll();
  }

  @SwaggerApi('Get a reserved book by id', CreateReservedBookDto)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservedBooksService.findOne(id);
  }
  @SwaggerApi('Get a reserved book by user id', CreateReservedBookDto)
  @Get('/userId/:id')
  findOneByUserId(@Param('id') id: string) {
    return this.reservedBooksService.findByUserId(id);
  }

  @SwaggerApi('Update a reserved book by id', CreateReservedBookDto)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservedBookDto: UpdateReservedBookDto,
  ) {
    return this.reservedBooksService.update(id, updateReservedBookDto);
  }

  @SwaggerApi('Delete a reserved book by id', CreateReservedBookDto)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservedBooksService.remove(id);
  }
}
