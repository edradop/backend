import { HttpExceptionModule } from '@edd/common/module/http-exception';
import { Module } from '@nestjs/common';
import { RoleExportModule } from '../role/export';
import { AuthorityController } from './controller';
import { AuthorityExportModule } from './export';
import { AuthorityService } from './service';

@Module({
  imports: [AuthorityExportModule, RoleExportModule, HttpExceptionModule],
  controllers: [AuthorityController],
  providers: [AuthorityService],
  exports: [],
})
export class AuthorityModule {}
