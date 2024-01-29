import { commonMiddleware } from '@edd/common';
import { SwaggerOptions, swagger } from '@edd/config';
import { PortService } from '@edd/config/module/port';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { EdradopModule } from './edradop.module';

const swaggerOptions: SwaggerOptions = {
  title: 'Edradop API',
  description: 'Edradop API description',
  version: '0.1.0',
};

async function bootstrap() {
  const app = await NestFactory.create(EdradopModule, { cors: true });
  const portService = app.get(PortService);
  const port = portService.edradopPort;

  commonMiddleware(app);
  swagger(app, swaggerOptions);

  await app.listen(port);

  return app;
}
bootstrap().then(async (app) => {
  Logger.log(`🚀 Application is running on ${await app.getUrl()}`);
});
