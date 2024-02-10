import { commonMiddleware } from '@edd/common';
import { HttpEnvironmentService } from '@edd/config/module/environment';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EdradopModule } from './edradop.module';

async function bootstrap() {
  const app = await NestFactory.create(EdradopModule, { cors: true });
  const httpEnvironmentService = app.get(HttpEnvironmentService);
  const port = httpEnvironmentService.edradopPort;

  commonMiddleware(app);
  const options = new DocumentBuilder()
    .setTitle('Your API Title')
    .setDescription('Your API description')
    .setVersion('1.0')
    // .addBearerAuth()
    .addServer(`${httpEnvironmentService.url('analytic')}/v1/swagger.json`, 'Analytic')
    .addServer(`${httpEnvironmentService.url('authentication')}/v1/swagger.json`, 'Authentication')
    .addServer(`${httpEnvironmentService.url('payment')}/v1/swagger.json`, 'payment')
    .addServer(`${httpEnvironmentService.url('storage')}/v1/swagger.json`, 'Storage')
    .addServer(`${httpEnvironmentService.url('user')}/v1/swagger.json`, 'User')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(port);

  return app;
}
bootstrap().then(async (app) => {
  Logger.log(`🚀 Application is running on ${await app.getUrl()}`);
});
