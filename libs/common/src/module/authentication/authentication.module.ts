import { EnvironmentModule } from '@edd/config/module/environment';
import { Module } from '@nestjs/common';
import { HttpExceptionModule } from '../http-exception';
import { AuthenticationService } from './service';

@Module({
  imports: [EnvironmentModule, HttpExceptionModule],
  providers: [AuthenticationService],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
