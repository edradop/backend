import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerOptions } from './swagger.type';
import { swaggerStyle } from './swagger.style';

function swagger(app: INestApplication<any>, { title, description, version }: SwaggerOptions) {
  const swaggerConfig = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('swagger', app, document, {
    customCss: swaggerStyle,
  });
}

export { swagger };
