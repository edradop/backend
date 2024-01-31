import { Module } from '@nestjs/common';
import { CommunicationController } from './controller';
import { CommunicationService } from './service';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentModule } from '@edd/config/module/environment';

@Module({
  imports: [ConfigModule.forRoot(), EnvironmentModule],
  controllers: [CommunicationController],
  providers: [CommunicationService],
})
export class CommunicationModule {}
