import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { EdradopController } from './controller';
import { EdradopService } from './service';
import { PortModule } from '@edd/config/module/port';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PortModule,
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
  ],
  controllers: [EdradopController],
  providers: [EdradopService],
})
export class EdradopModule {}
