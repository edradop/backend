import { PortModule } from '@edd/config/module/port';
import { Module } from '@nestjs/common';
import { HttpExceptionModule } from '../http-exception';
import { AuthenticationService } from './service';

@Module({
  imports: [PortModule, HttpExceptionModule],
  providers: [AuthenticationService],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
