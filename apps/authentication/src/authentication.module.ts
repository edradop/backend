import { registerJwtModule } from '@edd/common';
import { appJwtGuard } from '@edd/common/guard/app-jwt.guard';
import { HttpExceptionModule } from '@edd/common/module/http-exception';
import { UserModule } from '@edd/common/module/user';
import { PortModule } from '@edd/config/module/port';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationController } from './controller';
import { AuthenticationService } from './service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PortModule,
    registerJwtModule(),
    UserModule,
    HttpExceptionModule,
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, appJwtGuard],
})
export class AuthenticationModule {}
