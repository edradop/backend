import { EnvironmentModule } from '@edd/config/module/environment';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthorityExportModule } from '../authority/export';
import { RoleExportModule } from '../role/export';
import { UserController } from './controller';
import { UserExportModule } from './export';
import { ScheduleService, UserService } from './service';

@Module({
  imports: [
    UserExportModule,
    AuthorityExportModule,
    RoleExportModule,
    UserExportModule,
    EnvironmentModule,
    ScheduleModule,
  ],
  controllers: [UserController],
  providers: [UserService, ScheduleService],
})
export class UserModule {}
