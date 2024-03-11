import { rootMailerModule } from '@edd/config';
import { EnvironmentModule } from '@edd/config/module/environment';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommunicationController } from './controller';
import { CommunicationService } from './service';

@Module({
  imports: [ConfigModule.forRoot(), rootMailerModule(__dirname + '/templates'), EnvironmentModule],
  controllers: [CommunicationController],
  providers: [CommunicationService],
})
export class CommunicationModule {}
