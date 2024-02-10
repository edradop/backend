import { appFreezePipe } from '@edd/common';
import { appJwtGuard } from '@edd/common/guard/app-jwt.guard';
import { UserModule } from '@edd/common/module/user';
import { registerJwtModule } from '@edd/config';
import { EnvironmentModule } from '@edd/config/module/environment';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationController } from './controller';
import { GoogleModule } from './module/google';
import { AuthenticationService } from './service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EnvironmentModule,
    UserModule,
    GoogleModule,
    registerJwtModule(),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, appJwtGuard, appFreezePipe],
})
export class AuthenticationModule {}
