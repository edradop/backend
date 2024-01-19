import { EDRADOP, EDRADOP_DEFAULT_PORT } from '@edd/common';
import { Logger, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as csurf from 'csurf';
import helmet from 'helmet';
import { EdradopModule } from './edradop.module';
import * as cookieParser from 'cookie-parser';

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

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);

  Logger.log(`🚀 Application is running on ${port}`);
}
bootstrap();
