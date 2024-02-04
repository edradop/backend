import { EnvironmentModule } from '@edd/config/module/environment';
import { Module } from '@nestjs/common';
import { AuthenticationService } from './service';

@Module({
  imports: [EnvironmentModule],
  providers: [AuthenticationService],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
