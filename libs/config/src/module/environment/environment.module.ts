import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseEnvironmentService, EnvironmentService, MinioEnvironmentService } from './service';
import { HttpEnvironmentService } from './service';

@Module({
  imports: [ConfigModule],
  providers: [
    EnvironmentService,
    MinioEnvironmentService,
    HttpEnvironmentService,
    DatabaseEnvironmentService,
  ],
  exports: [
    EnvironmentService,
    MinioEnvironmentService,
    HttpEnvironmentService,
    DatabaseEnvironmentService,
  ],
})
export class EnvironmentModule {}
