import { EnvironmentModule } from '@edd/config/module/environment';
import { Module } from '@nestjs/common';
import { UserService } from '.';
import { HttpExceptionModule } from '../http-exception';

@Module({
  imports: [EnvironmentModule, HttpExceptionModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
