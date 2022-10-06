import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ReservedBooksService } from './reserved-books.service';
import { CreateReservedBookDto } from './dto/create-reserved-book.dto';
import { UpdateReservedBookDto } from './dto/update-reserved-book.dto';

@Controller('reserved-books')
export class ReservedBooksController {
  constructor(private readonly reservedBooksService: ReservedBooksService) {}

  @Post()
  create(@Body() createReservedBookDto: CreateReservedBookDto) {
    return this.reservedBooksService.create(createReservedBookDto);
  }

  @Get()
  findAll() {
    return this.reservedBooksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservedBooksService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservedBookDto: UpdateReservedBookDto,
  ) {
    return this.reservedBooksService.update(+id, updateReservedBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservedBooksService.remove(+id);
  }
}
