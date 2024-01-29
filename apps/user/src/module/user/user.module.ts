import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller';
import { UserService } from './service';
import { Email, Password, User, Username } from './type';
import { AuthenticationModule } from '@edd/common/module/authentication';
import { HttpExceptionModule } from '@edd/common/module/http-exception';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Email, Password, Username]),
    HttpExceptionModule,
    AuthenticationModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
