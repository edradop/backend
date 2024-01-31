import { AuthenticationModule } from '@edd/common/module/authentication';
import { HttpExceptionModule } from '@edd/common/module/http-exception';
import { AuthorityEnum } from '@edd/config';
import { EnvironmentModule, EnvironmentService } from '@edd/config/module/environment';
import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Authority, AuthorityExportModule } from '../authority/export';
import { Role, RoleExportModule } from '../role/export';
import { UserController } from './controller';
import { User, UserExportModule } from './export';
import { UserService } from './service';
import { UserType } from './type';
import { MinioModule } from '@edd/common/module/minio';

@Module({
  imports: [
    UserExportModule,
    AuthorityExportModule,
    RoleExportModule,
    HttpExceptionModule,
    AuthenticationModule,
    UserExportModule,
    EnvironmentModule,
    MinioModule.registerAsync({
      imports: [EnvironmentModule],
      inject: [EnvironmentService],
      useFactory: (environmentService: EnvironmentService) => {
        return {
          endPoint: environmentService.minioEndpoint,
          port: environmentService.minioPort,
          useSSL: environmentService.minioUseSSL,
          accessKey: environmentService.minioAccessKey,
          secretKey: environmentService.minioSecretKey,
        };
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Authority)
    private readonly authorityRepository: Repository<Authority>,
    private readonly environmentService: EnvironmentService,
  ) {
    createDefaults(
      this.environmentService,
      this.userRepository,
      this.authorityRepository,
      this.roleRepository,
    );
  }

  onApplicationBootstrap(): void {}
}

async function createDefaults(
  environmentService: EnvironmentService,
  userRepository: Repository<User>,
  authorityRepository: Repository<Authority>,
  roleRepository: Repository<Role>,
) {
  const isUser = await userRepository.findOneBy({
    username: environmentService.superUsername,
  });
  const userModel = new User();
  userModel.firstName = 'Super';
  userModel.lastName = 'User';
  userModel.email = environmentService.superEmail;
  userModel.username = environmentService.superUsername;
  userModel.password = environmentService.superPassword;
  userModel.status = UserType.ACTIVE;
  userModel.bio = 'super user';
  userModel.authorities = [];
  userModel.roles = [];

  const user = isUser ?? (await userRepository.save(userModel));

  const authorities = [];
  for (const authorityEntity in AuthorityEnum) {
    const isAuthority = await authorityRepository.findOneBy({
      code: authorityEntity,
    });
    if (isAuthority === null) {
      const authority = new Authority();
      authority.name = authorityEntity?.replace(/_/g, ' ').toLowerCase();
      authority.code = authorityEntity;
      authority.owner = user;
      const authorityModel = isAuthority ?? (await authorityRepository.save(authority));
      authorities.push(authorityModel);
    }
  }

  const roleModel = new Role();
  roleModel.name = 'super';
  roleModel.code = 'SUPER';
  roleModel.authorities = authorities;
  roleModel.owner = user;
  const isRole = await roleRepository.findOneBy({
    code: roleModel.code,
  });
  const role = isRole ?? (await roleRepository.save(roleModel));

  // if (!isUser) {
  userModel.authorities = authorities;
  userModel.roles = [role];
  const updatedUserModel = await userRepository.update(userModel.id, user);
  console.log('updatedUserModel', updatedUserModel);
  // }
}
