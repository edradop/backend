import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { StorageModule } from './storage.module';
import { Transport } from '@nestjs/microservices';
import { STORAGE, STORAGE_DEFAULT_PORT } from 'edd/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(StorageModule);
  const config = app.get(ConfigService);
  const port = config.get(STORAGE) || STORAGE_DEFAULT_PORT;

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: port,
    },
  });

  await app.startAllMicroservices();
  await app.listen(port);

  Logger.log(`🚀 Storage is running `);
}

bootstrap();
