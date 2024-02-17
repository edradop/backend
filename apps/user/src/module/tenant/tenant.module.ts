import { Module } from '@nestjs/common';
import { TenantService } from './service';
import { TenantController } from './controller';
import { TenantExportModule } from './export';

@Module({
  controllers: [TenantController],
  providers: [TenantService],
  imports: [TenantExportModule],
})
export class TenantModule {}
