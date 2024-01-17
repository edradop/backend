import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EDRADOP, EDRADOP_DEFAULT_PORT } from 'edd/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = config.get(EDRADOP) || EDRADOP_DEFAULT_PORT;

  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}
bootstrap();
