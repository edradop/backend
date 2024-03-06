import { UserType } from '@edd/common/type/user';
import { AuthorityEnum } from '@edd/config';
import { EnvironmentService } from '@edd/config/module/environment';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Authority } from '../../authority/export';
import { Role } from '../../role/export';
import { User } from '../export';
import { Tenant } from '../../tenant/export';

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(`USER_${ScheduleService.name}`);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Authority)
    private readonly authorityRepository: Repository<Authority>,
    private readonly environmentService: EnvironmentService,
  ) {}

  @Cron(new Date(Date.now() + 20 * 1000))
  async create() {
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
    this.logger.debug('created super user');
    const tenantModel = new Tenant();
    tenantModel.name = this.environmentService.tenantCode.toLowerCase().replace(/_/g, ' ');
    tenantModel.code = this.environmentService.tenantCode;
    tenantModel.owner = user;
    const _tenant = await this.tenantRepository.findOne({
      where: { code: tenantModel.code },
    });
    if (!_tenant) {
      await this.tenantRepository.save(tenantModel);
    }

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
    roleModel.name = this.environmentService.fullAuthorityRoleCode.toLowerCase().replace(/_/g, ' ');
    roleModel.code = this.environmentService.fullAuthorityRoleCode;
    roleModel.authorities = authorities;
    roleModel.owner = user;
    const _role = await this.roleRepository.findOne({
      where: { code: roleModel.code },
    });
    const role = _role ?? (await this.roleRepository.save(roleModel));

    if (user) {
      userModel.authorities = authorities;
      userModel.roles = [role];
      await this.userRepository.update(user.id, user);
    }
  }
}
