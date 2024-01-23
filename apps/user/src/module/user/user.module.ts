import { TokenModule } from '@edd/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller/user/user.controller';
import { UserService } from './service/user/user.service';
import { Email, Password, Username } from './type';
import { User } from './type/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Email, Password, Username]), TokenModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
