import { UserType } from '@edd/common/type/user';
import { AuthorityEnum } from '@edd/config';
import { EnvironmentService } from '@edd/config/module/environment';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Authority } from '../../authority/export';
import { Role } from '../../role/export';
import { Tenant } from '../../tenant/export';
import { User } from '../export';

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
    const user = await this.createUser();
    const tenant = await this.createTenant({ user });
    const authorities = await this.createAuthorities({ tenant, user });
    const role = await this.createRole({ authorities, user, tenant });

    this.updateUser({ user, authorities, role, tenant });
  }

  async createTenant({ user }: { user: User }) {
    const _tenant = await this.tenantRepository.findOne({
      where: { code: this.environmentService.tenantCode },
    });
    if (_tenant) return _tenant;

    const tenantModel = new Tenant();
    tenantModel.name = this.environmentService.tenantCode.toLowerCase().replace(/_/g, ' ');
    tenantModel.code = this.environmentService.tenantCode;
    tenantModel.owner = user;
    return await this.tenantRepository.save(tenantModel);
  }

  async createUser(): Promise<User> {
    const _user = await this.userRepository.findOne({
      where: { username: this.environmentService.superUsername },
    });
    if (_user) return _user;

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
    this.logger.debug('created super user');
    return await this.userRepository.save(userModel);
  }

  async updateUser({
    user,
    authorities,
    role,
    tenant,
  }: {
    user: User;
    authorities: Authority[];
    role: Role;
    tenant: Tenant;
  }) {
    if (user) {
      user.authorities = authorities;
      user.roles = [role];
      user.tenants = [tenant];
      await this.userRepository.update(user.id, user);
    }
  }

  async createRole({
    authorities,
    user,
    tenant,
  }: {
    authorities: Authority[];
    user: User;
    tenant: Tenant;
  }) {
    const _role = await this.roleRepository.findOne({
      where: { code: this.environmentService.fullAuthorityRoleCode },
    });
    if (_role) return _role;
    const roleModel = new Role();
    roleModel.name = this.environmentService.fullAuthorityRoleCode.toLowerCase().replace(/_/g, ' ');
    roleModel.code = this.environmentService.fullAuthorityRoleCode;
    roleModel.authorities = authorities;
    roleModel.owner = user;
    roleModel.tenant = tenant;
    return await this.roleRepository.save(roleModel);
  }

  async createAuthorities({ tenant, user }: { tenant: Tenant; user: User }): Promise<Authority[]> {
    const authorities = [];
    for (const authorityEntity in AuthorityEnum) {
      const _authority = await this.authorityRepository.findOne({
        where: { code: authorityEntity },
      });
      if (_authority) {
        authorities.push(_authority);
        continue;
      }
      const authority = new Authority();
      authority.name = authorityEntity?.replace(/_/g, ' ').toLowerCase();
      authority.code = authorityEntity;
      authority.tenant = tenant;
      authority.owner = user;
      const authorityModel = await this.authorityRepository.save(authority);
      authorities.push(authorityModel);
    }
    return authorities;
  }
}
