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

  /**
   * Create user, tenant, authorities and role.
   *
   * @return {Promise<void>}
   */
  @Cron(new Date(Date.now() + 20 * 1000))
  async create(): Promise<void> {
    const user = await this.createUser();
    const tenant = await this.createTenant({ user });
    const authorities = await this.createAuthorities({ tenant, user });
    const role = await this.createRole({ authorities, user, tenant });

    this.updateUser({ user, authorities, role, tenant });
  }

  /**
   * Create tenant if it does not exist
   *
   * @param {Object} param0 - Object containing user
   * @param {User} param0.user - the owner of the tenant
   * @returns the created tenant
   */
  async createTenant({ user }: { user: User }): Promise<Tenant> {
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

  /**
   * Create super user if it does not exist
   *
   * @returns the created super user
   */
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

  /**
   * Update user's authorities, role, and tenant if the user exists.
   *
   * @param {Object} param0 - Object containing tenant, user, role and authorities
   * @param {User} param0.user - The user to update
   * @param {Authority[]} param0.authorities - The authorities to assign to the user
   * @param {Role} param0.role - The role to assign to the user
   * @param {Tenant} param0.tenant - The tenant to assign to the user
   * @returns {Promise<void>} - A promise that resolves when the user is updated
   */
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
  }): Promise<void> {
    if (user) {
      user.authorities = [...(user.authorities || []), ...authorities];
      user.roles = [...(user.roles || []), role];
      user.tenants = [...(user.tenants || []), tenant];
      await this.userRepository.update(user.id, user);
    }
  }

  /**
   * Create a new role with the given authorities, user, and tenant.
   *
   * @param {Object} param0 - Object containing tenant, user and authorities
   * @param {Authority[]} param0.authorities - The list of authorities for the role
   * @param {User} param0.user - The user associated with the role
   * @param {Tenant} param0.tenant - The tenant associated with the role
   * @return {Promise<Role>} The created role
   */
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

  /**
   * Create authorities for a given tenant and user.
   *
   * @param {Object} param0 - Object containing tenant and user
   * @param {Tenant} param0.tenant - The tenant for which authorities are created
   * @param {User} param0.user - The user for whom authorities are created
   * @return {Promise<Authority[]>} The created authorities
   */
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
