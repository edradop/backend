import { HttpExceptionModule } from '@edd/common/module/http-exception';
import { Module } from '@nestjs/common';
import { RoleController } from './controller';
import { RoleExportModule } from './export';
import { RoleService } from './service';

@Module({
  imports: [RoleExportModule, HttpExceptionModule],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [],
})
export class RoleModule {}
