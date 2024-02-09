import { registerAuthenticationClient, registerUserClient } from '@edd/config';
import { EnvironmentModule } from '@edd/config/module/environment';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { ThrottlerModule } from '@nestjs/throttler';
import { EdradopController } from './controller';
import { EdradopService } from './service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EnvironmentModule,
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),
    ClientsModule.registerAsync([registerUserClient(), registerAuthenticationClient()]),
  ],
  controllers: [EdradopController],
  providers: [EdradopService],
})
export class EdradopModule {}
