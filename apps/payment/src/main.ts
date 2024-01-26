import {
  PAYMENT,
  PAYMENT_DEFAULT_PORT,
  SwaggerOptions,
  commonMiddleware,
  swagger,
} from '@edd/common';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { PaymentModule } from './payment.module';

const swaggerOptions: SwaggerOptions = {
  title: 'Edradop API',
  description: 'Edradop API description',
  version: '0.1.0',
};

async function bootstrap() {
  const app = await NestFactory.create(PaymentModule);
  const config = app.get(ConfigService);
  const port = config.get(PAYMENT, PAYMENT_DEFAULT_PORT);

  swagger(app, swaggerOptions);
  commonMiddleware(app);

  await app.listen(port);

  Logger.log(`🚀 Payment is running on ${port}`);
}

bootstrap();
