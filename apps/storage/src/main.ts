import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { StorageModule } from './storage.module';
import { PortService } from '@edd/config/module/port';

async function bootstrap() {
  const app = await NestFactory.create(StorageModule);
  const portService = app.get(PortService);
  const port = portService.storagePort;

  await app.listen(port);

  return app;
}

bootstrap().then(async (app) => {
  Logger.log(`🚀 Storage is running on ${await app.getUrl()} `);
});
