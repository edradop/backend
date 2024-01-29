import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AnalyticModule } from './analytic.module';
import { PortService } from '@edd/config/module/port';

async function bootstrap() {
  const app = await NestFactory.create(AnalyticModule);
  const portService = app.get(PortService);
  const port = portService.analyticPort;

  await app.listen(port);
  return app;
}

bootstrap().then(async (app) => {
  Logger.log(`🚀 Analytic is dad running on ${await app.getUrl()}`);
});
