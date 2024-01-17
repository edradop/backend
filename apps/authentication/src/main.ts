import { ConfigService } from '@nestjs/config';
import { AuthenticationModule } from './authentication.module';

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AUTHENTICATION, AUTHENTICATION_DEFAULT_PORT } from 'edd/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthenticationModule);
  const config = app.get(ConfigService);
  const port = config.get(AUTHENTICATION) || AUTHENTICATION_DEFAULT_PORT;

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: port,
    },
  });

  await app.startAllMicroservices();
  await app.listen(port);

  Logger.log(`🚀 Authentication is running`);
}

bootstrap();
