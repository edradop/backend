import { Authorities } from '@edd/common';
import { CreateTenantDto, UpdateTenantDto } from '@edd/common/type/tenant';
import { AuthorityEnum } from '@edd/config';
import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TenantService } from '../../tenant';

@ApiTags('tenant')
@Controller({ path: 'tenant', version: '1' })
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  @Authorities(AuthorityEnum.CREATE_ROLE)
  create(@Body() createTenantDto: CreateTenantDto) {
    return this.tenantService.create(createTenantDto);
  }

  @Get()
  @Authorities(AuthorityEnum.READ_ROLE)
  findAll() {
    return this.tenantService.findAll();
  }

  @Get(':id')
  @Authorities(AuthorityEnum.READ_ROLE)
  findOne(@Param('id') id: string) {
    return this.tenantService.findOne(id);
  }

  @Patch(':id')
  @Authorities(AuthorityEnum.UPDATE_ROLE)
  update(@Param('id') id: string, @Body() updateTenantDto: UpdateTenantDto) {
    return this.tenantService.update(id, updateTenantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tenantService.remove(id);
  }
}
