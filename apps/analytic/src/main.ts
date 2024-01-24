import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AnalyticModule } from './analytic.module';
import { ANALYTIC, ANALYTIC_DEFAULT_PORT } from '@edd/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AnalyticModule);
  const config = app.get(ConfigService);
  const port = config.get(ANALYTIC, ANALYTIC_DEFAULT_PORT);

  await app.listen(port);
  return app;
}

bootstrap().then((app) => {
  Logger.log(`🚀 Analytic is dad running on ${app.getUrl()}`);
});
