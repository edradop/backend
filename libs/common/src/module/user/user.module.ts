import { EnvironmentModule } from '@edd/config/module/environment';
import { Module } from '@nestjs/common';
import { UserService } from '.';

@Module({
  imports: [EnvironmentModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
