import { HttpEnvironmentService } from '@edd/config/module/environment';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { StorageModule } from './storage.module';

async function bootstrap() {
  const app = await NestFactory.create(StorageModule);
  const httpEnvironmentService = app.get(HttpEnvironmentService);
  const port = httpEnvironmentService.storagePort;

  await app.listen(port);

  return app;
}

bootstrap().then(async (app) => {
  Logger.log(`🚀 Storage is running on ${await app.getUrl()} `);
});
