import {
  SwaggerOptions,
  USER_DEFAULT_PORT,
  USER_PORT,
  commonMiddleware,
  swagger,
} from '@edd/common';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { middleware } from './util';

const swaggerOptions: SwaggerOptions = {
  title: 'User API',
  description: 'Edradop User API description',
  version: '0.1.0',
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = config.get(USER_PORT, USER_DEFAULT_PORT);

  swagger(app, swaggerOptions);
  commonMiddleware(app);
  middleware(app);

  await app.listen(port);

  return app;
}

bootstrap().then(async (app) => {
  Logger.log(`🚀 User is running on ${await app.getUrl()}`);
});
