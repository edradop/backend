import { AuthenticationModule } from '@edd/common/module/authentication';
import { HttpExceptionModule } from '@edd/common/module/http-exception';
import { AuthorityEnum } from '@edd/config';
import { EnvironmentModule, EnvironmentService } from '@edd/config/module/environment';
import { Module, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Authority, AuthorityExportModule } from '../authority/export';
import { Role, RoleExportModule } from '../role/export';
import { UserController } from './controller';
import { User, UserExportModule } from './export';
import { UserService } from './service';
import { UserType } from './type';

@Module({
  imports: [
    UserExportModule,
    AuthorityExportModule,
    RoleExportModule,
    HttpExceptionModule,
    AuthenticationModule,
    UserExportModule,
    EnvironmentModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Authority)
    private readonly authorityRepository: Repository<Authority>,
    private readonly environmentService: EnvironmentService,
  ) {}

  async onModuleInit() {
    const isUser = await this.userRepository.findOneBy({
      username: this.environmentService.superUsername,
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

    const user = isUser ?? (await this.userRepository.save(userModel));

    const authorities = [];
    for (const authorityEntity in AuthorityEnum) {
      console.log('authorityEntity', authorityEntity);
      const isAuthority = await this.authorityRepository.findOneBy({
        code: authorityEntity,
      });
      console.log('isAuthority', isAuthority);
      if (isAuthority === null) {
        const authority = new Authority();
        authority.name = authorityEntity?.replace(/_/g, ' ').toLowerCase();
        authority.code = authorityEntity;
        authority.owner = user;
        const authorityModel = isAuthority ?? (await this.authorityRepository.save(authority));
        authorities.push(authorityModel);
      }
    }

    const roleModel = new Role();
    roleModel.name = 'super';
    roleModel.code = 'SUPER';
    roleModel.authorities = authorities;
    roleModel.owner = user;
    const isRole = await this.roleRepository.findOneBy({
      code: roleModel.code,
    });
    const role = isRole ?? (await this.roleRepository.save(roleModel));

    // if (!isUser) {
    userModel.authorities = authorities;
    userModel.roles = [role];
    const updatedUserModel = await this.userRepository.update(userModel.id, user);
    console.log('updatedUserModel', updatedUserModel);
    // }
  }
}
