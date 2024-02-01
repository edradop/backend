import { AuthenticationModule } from '@edd/common/module/authentication';
import { HttpExceptionModule } from '@edd/common/module/http-exception';
import { MinioConfig, MinioModule } from '@edd/common/module/minio';
import { AuthorityEnum } from '@edd/config';
import { EnvironmentModule, EnvironmentService } from '@edd/config/module/environment';
import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientOptions } from 'minio';
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
    minio(),
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
  ) {}

  onApplicationBootstrap(): void {
    createDefaults(
      this.environmentService,
      this.userRepository,
      this.authorityRepository,
      this.roleRepository,
    );
  }
}

async function createDefaults(
  environmentService: EnvironmentService,
  userRepository: Repository<User>,
  authorityRepository: Repository<Authority>,
  roleRepository: Repository<Role>,
) {
  const _user = await userRepository.findOne({
    where: { username: environmentService.superUsername },
  });
  const userModel = new User();
  userModel.firstName = 'Super';
  userModel.lastName = 'User';
  userModel.email = environmentService.superEmail;
  userModel.username = environmentService.superUsername;
  userModel.password = environmentService.superPassword;
  userModel.status = UserType.ACTIVE;
  userModel.bio = 'super user';
  userModel.profilePhoto = '69ddd808db0f6863f64ceec202905df9.png';
  userModel.authorities = [];
  userModel.roles = [];
  const user = _user ?? (await userRepository.save(userModel));

  const authorities = [];
  for (const authorityEntity in AuthorityEnum) {
    const _authority = await authorityRepository.findOne({
      where: { code: authorityEntity },
    });
    if (_authority === null) {
      const authority = new Authority();
      authority.name = authorityEntity?.replace(/_/g, ' ').toLowerCase();
      authority.code = authorityEntity;
      authority.owner = user;
      const authorityModel = _authority ?? (await authorityRepository.save(authority));
      authorities.push(authorityModel);
    }
  }

  const roleModel = new Role();
  roleModel.name = 'super';
  roleModel.code = 'SUPER';
  roleModel.authorities = authorities;
  roleModel.owner = user;
  const _role = await roleRepository.findOne({
    where: { code: roleModel.code },
  });
  const role = _role ?? (await roleRepository.save(roleModel));

  if (!_user) {
    userModel.authorities = authorities;
    userModel.roles = [role];
    await userRepository.update(userModel.id, user);
  }
}

function minio() {
  return MinioModule.registerAsync({
    imports: [EnvironmentModule],
    inject: [EnvironmentService],
    useFactory: (environmentService: EnvironmentService) => {
      return {
        endPoint: environmentService.minioEndpoint,
        port: environmentService.minioPort,
        useSSL: environmentService.minioUseSSL,
        accessKey: environmentService.minioAccessKey,
        secretKey: environmentService.minioSecretKey,
      } as ClientOptions & Partial<MinioConfig>;
    },
  });
}
