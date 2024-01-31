import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './type';
import { Email, Password, Username } from '../type';

@Module({
  imports: [TypeOrmModule.forFeature([User, Email, Username, Password])],
  exports: [TypeOrmModule],
})
export class UserExportModule {}
