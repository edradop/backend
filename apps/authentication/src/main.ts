import { ConfigService } from '@nestjs/config';
import { AuthenticationModule } from './authentication.module';

import { AUTHENTICATION, AUTHENTICATION_DEFAULT_PORT } from '@edd/common';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AuthenticationModule);
  const config = app.get(ConfigService);
  const port = config.get(AUTHENTICATION) || AUTHENTICATION_DEFAULT_PORT;

  await app.listen(port);

  Logger.log(`🚀 Authentication is running on ${port}`);
}

bootstrap();
