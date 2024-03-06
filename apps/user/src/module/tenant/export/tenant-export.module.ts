import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from './type';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant])],
  exports: [TypeOrmModule],
})
export class TenantExportModule {}
