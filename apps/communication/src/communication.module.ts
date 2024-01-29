import { Module } from '@nestjs/common';
import { CommunicationController } from './controller';
import { CommunicationService } from './service';
import { ConfigModule } from '@nestjs/config';
import { PortModule } from '@edd/config/module/port';

@Module({
  imports: [ConfigModule.forRoot(), PortModule],
  controllers: [CommunicationController],
  providers: [CommunicationService],
})
export class CommunicationModule {}
