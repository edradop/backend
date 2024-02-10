import { commonMiddleware } from '@edd/common';
import { SwaggerOptions, swagger } from '@edd/config';
import { HttpEnvironmentService } from '@edd/config/module/environment';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const swaggerOptions: SwaggerOptions = {
  title: 'User API',
  description: 'Edradop User API description',
  version: '0.1.0',
  jsonFolder: 'user',
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpEnvironmentService = app.get(HttpEnvironmentService);
  const host = httpEnvironmentService.userHost;
  const port = httpEnvironmentService.userPort;

  commonMiddleware(app);
  swagger(app, swaggerOptions);

  await app.listen(port, host);

  return app;
}

bootstrap().then(async (app) => {
  Logger.log(`🚀 User is running on ${await app.getUrl()}`);
});
