import { commonMiddleware } from '@edd/common';
import { SwaggerOptions, swagger } from '@edd/config';
import { HttpEnvironmentService } from '@edd/config/module/environment';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { StorageModule } from './storage.module';

const swaggerOptions: SwaggerOptions = {
  title: 'Storage API',
  description: 'Edradop Storage API description',
  version: '0.1.0',
  jsonFolder: 'storage',
};

async function bootstrap() {
  const app = await NestFactory.create(StorageModule);
  const httpEnvironmentService = app.get(HttpEnvironmentService);
  const host = httpEnvironmentService.storageHost;
  const port = httpEnvironmentService.storagePort;

  commonMiddleware(app);
  swagger(app, swaggerOptions);

  await app.listen(port, host);

  return app;
}

bootstrap().then(async (app) => {
  Logger.log(`🚀 Storage is running on ${await app.getUrl()} `);
});
