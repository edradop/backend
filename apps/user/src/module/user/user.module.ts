import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller';
import { UserService } from './service';
import { Email, Password, User, Username } from './type';
import { TokenModule } from '@edd/common/module/token';

@Module({
  imports: [TypeOrmModule.forFeature([User, Email, Password, Username]), TokenModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
