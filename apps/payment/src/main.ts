import { PAYMENT, PAYMENT_DEFAULT_PORT } from '@edd/common';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { PaymentModule } from './payment.module';

async function bootstrap() {
  const app = await NestFactory.create(PaymentModule);
  const config = app.get(ConfigService);
  const port = config.get(PAYMENT, PAYMENT_DEFAULT_PORT);

  await app.listen(port);

  Logger.log(`🚀 Payment is running on ${port}`);
}

bootstrap();
