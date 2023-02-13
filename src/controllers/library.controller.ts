import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Put,
  Render,
} from '@nestjs/common';
import { LibraryService } from '../services/library.service';
import { CreateLibraryDto } from '../dto/library/create-library.dto';
import { UpdateLibraryDto } from '../dto/library/update-library.dto';

@Controller('libraries')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() createLibraryDto: CreateLibraryDto) {
    return this.libraryService.create(createLibraryDto);
  }

  @Get()
  @Render('./library/librariesList.pug')
  async findAll() {
    const data = await this.libraryService.findAll();
    return { libraries: data, title: 'Список библиотек' };
  }

  @Get(':id')
  @Render('./library/library.pug')
  async findOne(@Param('id') id: string) {
    const data = await this.libraryService.findOne(+id);
    return { ...data };
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  update(@Param('id') id: string, @Body() updateLibraryDto: UpdateLibraryDto) {
    return this.libraryService.update(+id, updateLibraryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.libraryService.remove(+id);
  }
}
