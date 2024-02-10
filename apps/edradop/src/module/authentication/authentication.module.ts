import { registerAuthenticationClient, registerJwtModule } from '@edd/config';
import { EnvironmentModule } from '@edd/config/module/environment';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AuthenticationController } from './controller';
import { AuthenticationService } from './service';

@Module({
  imports: [
    EnvironmentModule,
    registerJwtModule(),
    ClientsModule.registerAsync([registerAuthenticationClient()]),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
