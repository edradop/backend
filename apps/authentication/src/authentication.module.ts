import { appFreezePipe } from '@edd/common';
import { appJwtGuard } from '@edd/common/guard/app-jwt.guard';
import { registerCacheModule, registerJwtModule, registerUserClient } from '@edd/config';
import { EnvironmentModule } from '@edd/config/module/environment';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { AuthenticationController } from './controller';
import { GoogleModule } from './module/google';
import { AuthenticationService } from './service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EnvironmentModule,
    registerCacheModule(),
    GoogleModule,
    registerJwtModule(),
    ClientsModule.registerAsync([registerUserClient()]),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, appJwtGuard, appFreezePipe],
})
export class AuthenticationModule {}
