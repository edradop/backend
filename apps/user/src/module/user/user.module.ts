import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller/user/user.controller';
import { User } from './type/entity/user.entity';
import { UserService } from './service/user/user.service';
import { Email, Password, Username } from './type';

@Module({
  imports: [TypeOrmModule.forFeature([User, Email, Password, Username])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
