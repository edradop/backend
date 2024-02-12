import { appFreezePipe, appRoleGuard } from '@edd/common';
import { appJwtGuard } from '@edd/common/guard/app-jwt.guard';
import { registerJwtModule, registerUserDatabaseModule } from '@edd/config';
import { EnvironmentModule } from '@edd/config/module/environment';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthorityModule } from './module/authority';
import { RoleModule } from './module/role';
import { UserModule } from './module/user';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    EnvironmentModule,
    UserModule,
    RoleModule,
    AuthorityModule,
    registerJwtModule(),
    registerUserDatabaseModule(),
  ],
  providers: [appFreezePipe, appJwtGuard, appRoleGuard],
  exports: [],
})
export class AppModule {}
