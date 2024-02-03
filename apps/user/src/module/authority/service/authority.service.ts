import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Role } from '../../role/export';
import { Authority } from '../export';
import { CreateAuthorityDto, UpdateAuthorityDto } from '../type';

@Injectable()
export class AuthorityService {
  constructor(
    @InjectRepository(Authority)
    private readonly authorityRepository: Repository<Authority>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  create(createAuthorityDto: CreateAuthorityDto) {
    const role = new Authority();
    role.name = createAuthorityDto.name;
    role.code = createAuthorityDto.code;

    return this.authorityRepository.save(role);
  }

  findAll() {
    return this.authorityRepository.find();
  }

  findOne(id: string) {
    return this.authorityRepository.findOneBy({ id: id });
  }

  async update(id: string, updateAuthorityDto: UpdateAuthorityDto): Promise<Authority | null> {
    const authority = new Authority();
    authority.name = updateAuthorityDto.name;
    authority.id = id;

    await this.authorityRepository.update(id, authority);
    return await this.findOne(id);
  }

  async remove(id: string): Promise<DeleteResult> {
    const found = await this.roleRepository.findOneBy({ authorities: { id: id } });
    if (found) {
      throw new ConflictException('Authority is in use');
    }
    return this.authorityRepository.delete(id);
  }
}
