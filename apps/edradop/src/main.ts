import { EDRADOP, EDRADOP_DEFAULT_PORT, SwaggerOptions, swagger } from '@edd/common';
import { Logger, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import helmet from 'helmet';
import { EdradopModule } from './edradop.module';

const swaggerOptions: SwaggerOptions = {
  title: 'Edradop API',
  description: 'Edradop API description',
  version: '0.1.0',
};

async function bootstrap() {
  const app = await NestFactory.create(EdradopModule, { cors: true });
  const config = app.get(ConfigService);
  const port = config.get(EDRADOP) || EDRADOP_DEFAULT_PORT;

  app.use(helmet());
  app.use(cookieParser());
  app.use(csurf());
  app.enableVersioning({
    type: VersioningType.URI,
  });

  swagger(app, swaggerOptions);

  await app.listen(port);

  Logger.log(`🚀 Application is running on ${port}`);
}
bootstrap();
