import { EnvironmentModule } from '@edd/config/module/environment';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthorityExportModule } from '../authority/export';
import { RoleExportModule } from '../role/export';
import { TenantExportModule } from '../tenant/export';
import { AuthenticationController, ProfileController, UserController } from './controller';
import { UserExportModule } from './export';
import { AuthenticationService, ProfileService, ScheduleService, UserService } from './service';

@Module({
  imports: [
    UserExportModule,
    AuthorityExportModule,
    RoleExportModule,
    UserExportModule,
    TenantExportModule,
    EnvironmentModule,
    ScheduleModule,
  ],
  controllers: [UserController, AuthenticationController, ProfileController],
  providers: [UserService, ScheduleService, AuthenticationService, ProfileService],
})
export class UserModule {}
