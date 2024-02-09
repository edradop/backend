import { AuthenticationModule } from './authentication.module';

import { commonMiddleware, connectMicroServicesMiddleware } from '@edd/common';
import { SwaggerOptions, swagger } from '@edd/config';
import { EnvironmentService } from '@edd/config/module/environment';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

const swaggerOptions: SwaggerOptions = {
  title: 'Authentication API',
  description: 'Edradop Authentication API description',
  version: '0.1.0',
};

async function bootstrap() {
  const app = await NestFactory.create(AuthenticationModule);
  const portService = app.get(EnvironmentService);
  const host = portService.authenticationHost;
  const port = portService.authenticationPort;

  commonMiddleware(app);
  swagger(app, swaggerOptions);

  await connectMicroServicesMiddleware(app, host, port);
  await app.listen(port);

  return app;
}

bootstrap().then(async (app) => {
  Logger.log(`🚀 Authentication is dad running on ${await app.getUrl()}`);
});
