import { NestFactory } from '@nestjs/core';
import { CommunicationModule } from './communication.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(CommunicationModule, {
    transport: Transport.TCP,
  });

  app.listen();

  Logger.log(`🚀 Communication is running`);
}

bootstrap();
