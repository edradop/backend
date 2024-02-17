import { CreateTenantDto, UpdateTenantDto } from '@edd/common/type/tenant';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TenantService {
  create(createTenantDto: CreateTenantDto) {
    console.log(createTenantDto);
    return 'This action adds a new tenant';
  }

  findAll() {
    return `This action returns all tenant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tenant`;
  }

  update(id: number, updateTenantDto: UpdateTenantDto) {
    console.log(updateTenantDto);
    return `This action updates a #${id} tenant`;
  }

  remove(id: number) {
    return `This action removes a #${id} tenant`;
  }
}
