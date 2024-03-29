import { AuthenticationModule } from './authentication.module';

import { commonMiddleware } from '@edd/common';
import { SwaggerOptions, swagger } from '@edd/config';
import { HttpEnvironmentService } from '@edd/config/module/environment';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

const swaggerOptions: SwaggerOptions = {
  title: 'Authentication API',
  description: 'Edradop Authentication API description',
  version: '0.1.0',
  jsonFolder: 'authentication',
};

async function bootstrap() {
  const app = await NestFactory.create(AuthenticationModule);
  const httpEnvironmentService = app.get(HttpEnvironmentService);
  const host = httpEnvironmentService.authenticationHost;
  const port = httpEnvironmentService.authenticationPort;

  commonMiddleware(app);
  swagger(app, swaggerOptions);

  await app.listen(port, host);

  return app;
}

bootstrap().then(async (app) => {
  Logger.log(`🚀 Authentication is running on ${await app.getUrl()}`);
});
