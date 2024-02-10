import { commonMiddleware } from '@edd/common';
import { SwaggerOptions, swagger } from '@edd/config';
import { HttpEnvironmentService } from '@edd/config/module/environment';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { PaymentModule } from './payment.module';

const swaggerOptions: SwaggerOptions = {
  title: 'Edradop API',
  description: 'Edradop API description',
  version: '0.1.0',
};

async function bootstrap() {
  const app = await NestFactory.create(PaymentModule);
  const httpEnvironmentService = app.get(HttpEnvironmentService);
  const port = httpEnvironmentService.paymentPort;

  swagger(app, swaggerOptions);
  commonMiddleware(app);

  await app.listen(port);

  return app;
}

bootstrap().then(async (app) => {
  Logger.log(`🚀 Payment is running on ${await app.getUrl()}`);
});
