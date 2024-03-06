import { CreateTenantDto, UpdateTenantDto } from '@edd/common/type/tenant';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Tenant } from '../export';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  create(createTenantDto: CreateTenantDto) {
    const tenant = new Tenant();
    tenant.name = createTenantDto.name;
    tenant.code = createTenantDto.code;

    return this.tenantRepository.save(tenant);
  }

  findAll() {
    return this.tenantRepository.find();
  }

  findOne(id: string) {
    return this.tenantRepository.findOneBy({ id: id });
  }

  async update(id: string, updateTenantDto: UpdateTenantDto): Promise<Tenant | null> {
    const tenant = new Tenant();
    tenant.name = updateTenantDto.name!;
    tenant.id = id;

    await this.tenantRepository.update(id, tenant);
    return await this.findOne(id);
  }

  remove(id: string): Promise<DeleteResult> {
    return this.tenantRepository.delete(id);
  }
}
