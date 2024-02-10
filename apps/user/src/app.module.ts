import { appFreezePipe, appRoleGuard } from '@edd/common';
import { appJwtGuard } from '@edd/common/guard/app-jwt.guard';
import { registerJwtModule, registerUserDatabaseModule } from '@edd/config';
import { EnvironmentModule } from '@edd/config/module/environment';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthorityModule } from './module/authority';
import { RoleModule } from './module/role';
import { UserModule } from './module/user';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EnvironmentModule,
    registerJwtModule(),
    registerUserDatabaseModule(),
    UserModule,
    RoleModule,
    AuthorityModule,
  ],
  providers: [appFreezePipe, appJwtGuard, appRoleGuard],
  exports: [],
})
export class AppModule {}
