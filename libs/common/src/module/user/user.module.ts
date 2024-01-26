import { Module } from '@nestjs/common';
import { UserService } from '.';
import { ConfigModule } from '@nestjs/config';
import { HttpExceptionModule } from '../http-exception';

@Module({
  imports: [ConfigModule, HttpExceptionModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
