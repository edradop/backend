import { NestFactory } from '@nestjs/core';
import { CommunicationModule } from './communication.module';
import { Logger } from '@nestjs/common';
import { EnvironmentService } from '@edd/config/module/environment';

async function bootstrap() {
  const app = await NestFactory.create(CommunicationModule);
  const portService = app.get(EnvironmentService);
  const port = portService.communicationPort;

  await app.listen(port);

  return app;
}

bootstrap().then(async (app) => {
  Logger.log(`🚀 Communication is running on ${await app.getUrl()}`);
});
