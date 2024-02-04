import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Email, Password, ThirdPartyAuthentication, User, Username } from './type';

@Module({
  imports: [TypeOrmModule.forFeature([User, Email, Username, Password, ThirdPartyAuthentication])],
  exports: [TypeOrmModule],
})
export class UserExportModule {}
