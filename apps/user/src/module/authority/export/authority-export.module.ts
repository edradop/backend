import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Authority } from './type';

@Module({
  imports: [TypeOrmModule.forFeature([Authority])],
  exports: [TypeOrmModule],
})
export class AuthorityExportModule {}
