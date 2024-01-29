import { appJwtGuard } from '@edd/common/guard/app-jwt.guard';
import { HttpExceptionModule } from '@edd/common/module/http-exception';
import { UserModule } from '@edd/common/module/user';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationController } from './controller';
import { AuthenticationService } from './service';
import { registerJwtModule } from '@edd/common';

@Module({
  imports: [ConfigModule.forRoot(), registerJwtModule(), UserModule, HttpExceptionModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, appJwtGuard],
})
export class AuthenticationModule {}
