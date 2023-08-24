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
  Query,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { SwaggerApi } from '@decorators/swaggerApi.decorator';
import { CreateLibraryDto } from '@dto/library/create-library.dto';
import { UpdateLibraryDto } from '@dto/library/update-library.dto';
import { PaginationOptionsDto } from '@dto/pagination/pagination-options.dto';
import { LibraryService } from '@services/library.service';

@ApiTags('Libraries')
@Controller('libraries')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @SwaggerApi('Add a new library', CreateLibraryDto)
  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() createLibraryDto: CreateLibraryDto) {
    return this.libraryService.create(createLibraryDto);
  }

  @SwaggerApi('Get a list of the libraries', [CreateLibraryDto])
  @Get()
  async findAll(@Query() query: PaginationOptionsDto) {
    const data = await this.libraryService.findAll(query);
    return data;
  }

  @SwaggerApi('Get the library by id', CreateLibraryDto)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.libraryService.findOne(id);
    return data;
  }

  @SwaggerApi('Update library by id', CreateLibraryDto)
  @UsePipes(new ValidationPipe())
  @Put(':id')
  update(@Param('id') id: string, @Body() updateLibraryDto: UpdateLibraryDto) {
    return this.libraryService.update(id, updateLibraryDto);
  }

  @SwaggerApi('Delete library by id', CreateLibraryDto)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.libraryService.remove(id);
  }
}
