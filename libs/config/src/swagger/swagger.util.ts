import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { swaggerStyle } from './swagger.style';
import { SwaggerOptions } from './swagger.type';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { IS_PRODUCTION } from '../constant';

function swagger(
  app: INestApplication<any>,
  { title, description, version, jsonFolder }: SwaggerOptions,
) {
  const swaggerConfig = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  if (!IS_PRODUCTION && jsonFolder) {
    writeFileSync(
      join(__dirname, '../../..', 'apps', jsonFolder, 'src', 'swagger.json'), // TODO: fix this
      JSON.stringify(document),
      'utf8',
    );
  }
  SwaggerModule.setup('swagger', app, document, {
    customCss: swaggerStyle,
  });
  return document;
}

export { swagger };
