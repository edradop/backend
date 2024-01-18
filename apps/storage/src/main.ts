import { STORAGE, STORAGE_DEFAULT_PORT } from '@edd/common';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { StorageModule } from './storage.module';

async function bootstrap() {
  const app = await NestFactory.create(StorageModule);
  const config = app.get(ConfigService);
  const port = config.get(STORAGE) || STORAGE_DEFAULT_PORT;

  await app.listen(port);

  Logger.log(`🚀 Storage is running on ${port} `);
}

bootstrap();
