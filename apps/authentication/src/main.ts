import { ConfigService } from '@nestjs/config';
import { AuthenticationModule } from './authentication.module';

import {
  AUTHENTICATION,
  AUTHENTICATION_DEFAULT_PORT,
  SwaggerOptions,
  commonMiddleware,
  swagger,
} from '@edd/common';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

const swaggerOptions: SwaggerOptions = {
  title: 'Authentication API',
  description: 'Edradop Authentication API description',
  version: '0.1.0',
};

async function bootstrap() {
  const app = await NestFactory.create(AuthenticationModule);
  const config = app.get(ConfigService);
  const port = config.get(AUTHENTICATION, AUTHENTICATION_DEFAULT_PORT);

  commonMiddleware(app);
  swagger(app, swaggerOptions);
  await app.listen(port);

  return app;
}

bootstrap().then(async (app) => {
  Logger.log(`🚀 Authentication is dad running on ${await app.getUrl()}`);
});
