import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationService } from './service';
import { HttpExceptionModule } from '../http-exception';

@Module({
  imports: [ConfigModule, HttpExceptionModule],
  providers: [AuthenticationService],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
