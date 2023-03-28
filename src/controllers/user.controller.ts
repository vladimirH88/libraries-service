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
import { CreateUserDto } from '@dto/user/create-user.dto';
import { UpdateUserDto } from '@dto/user/update-user.dto';
import { UserService } from '@services/user.service';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @SwaggerApi('Add a new user', CreateUserDto)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @SwaggerApi('Get a list of users', [CreateUserDto])
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @SwaggerApi('Get the user by id', CreateUserDto)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @SwaggerApi('Update the user by id', CreateUserDto)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @SwaggerApi('Update the user by id', CreateUserDto)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
