import { Module } from '@nestjs/common';
import { CommunicationController } from './controller';
import { CommunicationService } from './service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [CommunicationController],
  providers: [CommunicationService],
})
export class CommunicationModule {}
