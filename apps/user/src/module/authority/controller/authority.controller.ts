import { Authorities } from '@edd/common';
import { CreateAuthorityDto, UpdateAuthorityDto } from '@edd/common/type/authority';
import { AuthorityEnum } from '@edd/config';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthorityService } from '../service';

@ApiTags('authority')
@Controller({ path: 'authority', version: '1' })
export class AuthorityController {
  constructor(private readonly authorityService: AuthorityService) {}

  @Post()
  @Authorities(AuthorityEnum.CREATE_AUTHORITY)
  create(@Body() createAuthorityDto: CreateAuthorityDto) {
    return this.authorityService.create(createAuthorityDto);
  }

  @Get()
  @Authorities(AuthorityEnum.READ_AUTHORITY)
  findAll() {
    return this.authorityService.findAll();
  }

  @Get(':id')
  @Authorities(AuthorityEnum.READ_AUTHORITY)
  findOne(@Param('id') id: string) {
    return this.authorityService.findOne(id);
  }

  @Patch(':id')
  @Authorities(AuthorityEnum.UPDATE_AUTHORITY)
  update(@Param('id') id: string, @Body() updateAuthorityDto: UpdateAuthorityDto) {
    return this.authorityService.update(id, updateAuthorityDto);
  }

  @Delete(':id')
  @Authorities(AuthorityEnum.DELETE_AUTHORITY)
  remove(@Param('id') id: string) {
    return this.authorityService.remove(id);
  }
}
