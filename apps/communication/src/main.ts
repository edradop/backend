import { NestFactory } from '@nestjs/core';
import { CommunicationModule } from './communication.module';
import { Logger } from '@nestjs/common';
import { COMMUNICATION, COMMUNICATION_DEFAULT_PORT } from '@edd/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(CommunicationModule);
  const config = app.get(ConfigService);
  const port = config.get(COMMUNICATION) || COMMUNICATION_DEFAULT_PORT;

  await app.listen(port);

  Logger.log(`🚀 Communication is running on ${port}`);
}

bootstrap();
