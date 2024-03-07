import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AnalyticModule } from './analytic.module';
import { HttpEnvironmentService } from '@edd/config/module/environment';

async function bootstrap() {
  const app = await NestFactory.create(AnalyticModule);
  const httpEnvironmentService = app.get(HttpEnvironmentService);
  const port = httpEnvironmentService.analyticPort;

  await app.listen(port);
  return app;
}

bootstrap().then(async (app) => {
  Logger.log(`🚀 Analytic is running on ${await app.getUrl()}`);
});
