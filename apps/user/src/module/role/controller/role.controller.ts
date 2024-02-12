import { Authorities } from '@edd/common';
import { CreateRoleDto, UpdateRoleDto } from '@edd/common/module/role/type';
import { AuthorityEnum } from '@edd/config';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoleService } from '../service';

@ApiTags('role')
@Controller({ path: 'role', version: '1' })
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @Authorities(AuthorityEnum.CREATE_ROLE)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  @Authorities(AuthorityEnum.READ_ROLE)
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  @Authorities(AuthorityEnum.READ_ROLE)
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }

  @Patch(':id')
  @Authorities(AuthorityEnum.UPDATE_ROLE)
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(id);
  }
}
