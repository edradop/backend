import { EnvironmentModule } from '@edd/config/module/environment';
import { Module } from '@nestjs/common';
import { UserExportModule } from '../user/export';
import { TenantController } from './controller';
import { TenantExportModule } from './export';
import { TenantService } from './service';

@Module({
  imports: [TenantExportModule, UserExportModule, EnvironmentModule],
  controllers: [TenantController],
  providers: [TenantService],
})
export class TenantModule {}
