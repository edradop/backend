import {
  EDRADOP,
  EDRADOP_DEFAULT_PORT,
  SwaggerOptions,
  commonMiddleware,
  swagger,
} from '@edd/common';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { EdradopModule } from './edradop.module';

const swaggerOptions: SwaggerOptions = {
  title: 'Edradop API',
  description: 'Edradop API description',
  version: '0.1.0',
};

async function bootstrap() {
  const app = await NestFactory.create(EdradopModule, { cors: true });
  const config = app.get(ConfigService);
  const port = config.get(EDRADOP, EDRADOP_DEFAULT_PORT);

  swagger(app, swaggerOptions);
  commonMiddleware(app);

  await app.listen(port);

  Logger.log(`🚀 Application is running on ${port}`);
}
bootstrap();
