import { HttpEnvironmentService } from '@edd/config/module/environment';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { CommunicationModule } from './communication.module';

async function bootstrap() {
  const app = await NestFactory.create(CommunicationModule);
  const httpEnvironmentService = app.get(HttpEnvironmentService);
  const port = httpEnvironmentService.communicationPort;

  await app.listen(port);

  return app;
}

bootstrap().then(async (app) => {
  Logger.log(`🚀 Communication is running on ${await app.getUrl()}`);
});
