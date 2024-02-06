import { CreateRoleDto, UpdateRoleDto } from '@edd/common/module/role/type';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Authority } from '../../authority/export';
import { Role } from '../export';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  create(createRoleDto: CreateRoleDto) {
    const role = new Role();
    role.name = createRoleDto.name;
    role.code = createRoleDto.code;
    role.authorities = createRoleDto.authorities.map((id) => {
      const authority = new Authority();
      authority.id = id;
      return authority;
    });

    return this.roleRepository.save(role);
  }

  findAll() {
    return this.roleRepository.find();
  }

  findOne(id: string) {
    return this.roleRepository.findOneBy({ id: id });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role | null> {
    const role = new Role();
    role.name = updateRoleDto.name;
    role.id = id;

    await this.roleRepository.update(id, role);
    return await this.findOne(id);
  }

  remove(id: string): Promise<DeleteResult> {
    return this.roleRepository.delete(id);
  }
}
