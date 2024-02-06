import { appFreezePipe, appRoleGuard } from '@edd/common';
import { appJwtGuard } from '@edd/common/guard/app-jwt.guard';
import { registerJwtModule } from '@edd/config';
import { EnvironmentModule, EnvironmentService } from '@edd/config/module/environment';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorityModule } from './module/authority';
import { RoleModule } from './module/role';
import { UserModule } from './module/user';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EnvironmentModule,
    registerJwtModule(),
    typeOrm(),
    UserModule,
    RoleModule,
    AuthorityModule,
  ],
  providers: [appFreezePipe, appJwtGuard, appRoleGuard],
  exports: [],
})
export class AppModule {}

function typeOrm() {
  return TypeOrmModule.forRootAsync({
    imports: [EnvironmentModule],
    useFactory: async (environmentService: EnvironmentService) => {
      return {
        type: 'postgres',
        host: environmentService.postgresHost,
        port: environmentService.postgresPort,
        username: environmentService.postgresUser,
        password: environmentService.postgresPassword,
        database: environmentService.postgresDatabase,
        entities: [],
        autoLoadEntities: true,
        synchronize: true,
      };
    },
    inject: [EnvironmentService],
  });
}
