import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { USER_DEFAULT_PORT, USER_PORT } from 'edd/common';
import { UserModule } from './user.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  const config = app.get(ConfigService);
  const port = config.get(USER_PORT) || USER_DEFAULT_PORT;

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: port,
    },
  });

  await app.startAllMicroservices();
  await app.listen(port);

  Logger.log(`🚀 User is running`);
}

bootstrap();
