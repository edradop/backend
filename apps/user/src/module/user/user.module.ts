import { AuthenticationModule } from '@edd/common/module/authentication';
import { HttpExceptionModule } from '@edd/common/module/http-exception';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorityExportModule } from '../authority/export';
import { RoleExportModule } from '../role/export';
import { UserController } from './controller';
import { User, UserExportModule } from './export';
import { UserService } from './service';
import { Email, Password, Username } from './type';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Email, Password, Username]),
    UserExportModule,
    AuthorityExportModule,
    RoleExportModule,
    HttpExceptionModule,
    AuthenticationModule,
    UserExportModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
