import { ConfigService } from '@nestjs/config';
import { AuthenticationModule } from './authentication.module';

import { AUTHENTICATION, AUTHENTICATION_DEFAULT_PORT, SwaggerOptions, swagger } from '@edd/common';
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
  const port = config.get(AUTHENTICATION) || AUTHENTICATION_DEFAULT_PORT;

  swagger(app, swaggerOptions);
  await app.listen(port);

  Logger.log(`🚀 Authentication is running on ${port}`);
}

bootstrap();
