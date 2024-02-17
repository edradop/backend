import { UserType } from '@edd/common/type/user';
import { AuthorityEnum } from '@edd/config';
import { EnvironmentService } from '@edd/config/module/environment';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Authority } from '../../authority/export';
import { Role } from '../../role/export';
import { User } from '../export';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Authority)
    private readonly authorityRepository: Repository<Authority>,
    private readonly environmentService: EnvironmentService,
  ) {}

  @Cron(new Date(Date.now() + 20 * 1000))
  async create() {
    console.log('schedule create default user');
    const _user = await this.userRepository.findOne({
      where: { username: this.environmentService.superUsername },
    });
    const userModel = new User();
    userModel.firstName = 'Super';
    userModel.lastName = 'User';
    userModel.email = this.environmentService.superEmail;
    userModel.username = this.environmentService.superUsername;
    userModel.password = this.environmentService.superPassword;
    userModel.status = UserType.ACTIVE;
    userModel.bio = 'super user';
    userModel.authorities = [];
    userModel.roles = [];
    const user = _user ?? (await this.userRepository.save(userModel));

    const authorities = [];
    for (const authorityEntity in AuthorityEnum) {
      const _authority = await this.authorityRepository.findOne({
        where: { code: authorityEntity },
      });
      if (_authority === null) {
        const authority = new Authority();
        authority.name = authorityEntity?.replace(/_/g, ' ').toLowerCase();
        authority.code = authorityEntity;
        authority.owner = user;
        const authorityModel = _authority ?? (await this.authorityRepository.save(authority));
        authorities.push(authorityModel);
      }
    }

    const roleModel = new Role();
    roleModel.name = 'super';
    roleModel.code = 'SUPER';
    roleModel.authorities = authorities;
    roleModel.owner = user;
    const _role = await this.roleRepository.findOne({
      where: { code: roleModel.code },
    });
    const role = _role ?? (await this.roleRepository.save(roleModel));

    if (!_user) {
      userModel.authorities = authorities;
      userModel.roles = [role];
      await this.userRepository.update(userModel.id, user);
    }
  }
}
