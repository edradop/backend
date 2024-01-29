import { commonMiddleware } from '@edd/common';
import { SwaggerOptions, swagger } from '@edd/config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { middleware } from './middleware';
import { PortService } from '@edd/config/module/port';

const swaggerOptions: SwaggerOptions = {
  title: 'User API',
  description: 'Edradop User API description',
  version: '0.1.0',
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const portService = app.get(PortService);
  const port = portService.userPort;

  commonMiddleware(app);
  middleware(app);
  swagger(app, swaggerOptions);

  await app.listen(port);

  return app;
}

bootstrap().then(async (app) => {
  Logger.log(`🚀 User is running on ${await app.getUrl()}`);
});
