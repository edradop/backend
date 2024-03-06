import { EnvironmentModule } from '@edd/config/module/environment';
import { Module } from '@nestjs/common';
import { UserExportModule } from '../user/export';
import { RoleController } from './controller';
import { RoleExportModule } from './export';
import { RoleService } from './service';

@Module({
  imports: [RoleExportModule, UserExportModule, EnvironmentModule],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
