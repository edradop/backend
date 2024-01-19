import { USER_DEFAULT_PORT, USER_PORT } from '@edd/common';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = config.get(USER_PORT) || USER_DEFAULT_PORT;

  await app.listen(port);

  Logger.log(`🚀 User is running on ${port}`);
}

bootstrap();
