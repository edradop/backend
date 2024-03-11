import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseEnvironmentService, EnvironmentService, MinioEnvironmentService } from './service';
import { HttpEnvironmentService } from './service';
import { MailerEnvironmentService } from './service/mailer-environment.service';

@Module({
  imports: [ConfigModule],
  providers: [
    EnvironmentService,
    MinioEnvironmentService,
    HttpEnvironmentService,
    DatabaseEnvironmentService,
    MailerEnvironmentService,
  ],
  exports: [
    EnvironmentService,
    MinioEnvironmentService,
    HttpEnvironmentService,
    DatabaseEnvironmentService,
  ],
})
export class EnvironmentModule {}
