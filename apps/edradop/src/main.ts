import { NestFactory } from '@nestjs/core';
import { EdradopModule } from './edradop.module';
import { EDRADOP, EDRADOP_DEFAULT_PORT } from '@edd/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(EdradopModule);
  const config = app.get(ConfigService);
  const port = config.get(EDRADOP) || EDRADOP_DEFAULT_PORT;

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);

  Logger.log(`🚀 Application is running on ${port}`);
}
bootstrap();
