import {
  Controller,
  Get,
  Body,
  Param,
  Put,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { Request } from 'express';

import { Role } from '@constants/Roles';
import { ApiPaginatedResponse } from '@decorators/paginated-response.decorator';
import { SwaggerApi } from '@decorators/swaggerApi.decorator';
import { CreateBookedBookDTO } from '@dto/bookedBook/create-booked-book.dto';
import { UpdateBookedBookDTO } from '@dto/bookedBook/update-booked-book.dto';
import { PaginationOptionsDto } from '@dto/pagination/pagination-options.dto';
import { AccessTokenGuard } from '@guards/accessToken.guard';
import { BookedBookService } from '@services/booked-book.service';

@UseGuards(AccessTokenGuard)
@ApiTags('Booked-books')
@Controller('booked-books')
export class BookedBookController {
  constructor(private readonly bookedBookService: BookedBookService) {}

  @ApiPaginatedResponse(CreateBookedBookDTO)
  @SwaggerApi('Get a list of booked books', CreateBookedBookDTO)
  @Get()
  async findAll(@Query() query: PaginationOptionsDto, @Req() req: Request) {
    const user = req.user;
    if (user['roles'].includes(Role.Admin)) {
      return await this.bookedBookService.findAll(query);
    }
    return await this.bookedBookService.findAllByUserId(user['id'], query);
  }

  @SwaggerApi('Get the booked book by id', CreateBookedBookDTO)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.bookedBookService.findById(id);
  }

  @SwaggerApi('Update the booked book by id', CreateBookedBookDTO)
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateBookedBookDTO) {
    return await this.bookedBookService.update(id, dto);
  }

  @SwaggerApi('Order a book', CreateBookedBookDTO)
  @Get('/order-book/:id')
  async orderBook(@Param('id') id: string, @Req() req: Request) {
    console.log(req.user);
    return await this.bookedBookService.orderBook(req.user['id'], id);
  }

  @SwaggerApi('Reject the order', CreateBookedBookDTO)
  @Get('/reject-order/:id')
  async rejectOrder(@Param('id') id: string, @Req() req: Request) {
    return await this.bookedBookService.rejectOrder(req.user['id'], id);
  }
}
