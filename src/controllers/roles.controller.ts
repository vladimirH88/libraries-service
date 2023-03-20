import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { SwaggerApi } from '@decorators/swaggerApi.decorator';
import { CreateRoleDto } from '@dto/roles/create-role.dto';
import { UpdateRoleDto } from '@dto/roles/update-role.dto';
import { RolesService } from '@services/roles.service';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @SwaggerApi('Add a new role', CreateRoleDto)
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @SwaggerApi('Get a list of roles', [CreateRoleDto])
  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @SwaggerApi('Get the role by id', CreateRoleDto)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @SwaggerApi('Update the role by id', CreateRoleDto)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }
}
