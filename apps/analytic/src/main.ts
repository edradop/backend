import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AnalyticModule } from './analytic.module';
import { Transport } from '@nestjs/microservices';
import { ANALYTIC, ANALYTIC_DEFAULT_PORT } from 'edd/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AnalyticModule);
  const config = app.get(ConfigService);
  const port = config.get(ANALYTIC) || ANALYTIC_DEFAULT_PORT;

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: port,
    },
  });

  await app.startAllMicroservices();
  await app.listen(port);

  Logger.log(`🚀 Analytic is running`);
}

bootstrap();
