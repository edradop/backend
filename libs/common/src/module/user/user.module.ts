import { PortModule } from '@edd/config/module/port';
import { Module } from '@nestjs/common';
import { UserService } from '.';
import { HttpExceptionModule } from '../http-exception';

@Module({
  imports: [PortModule, HttpExceptionModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
