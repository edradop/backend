import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { PaymentModule } from './payment.module';
import { Transport } from '@nestjs/microservices';
import { PAYMENT, PAYMENT_DEFAULT_PORT } from 'edd/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(PaymentModule);
  const config = app.get(ConfigService);
  const port = config.get(PAYMENT) || PAYMENT_DEFAULT_PORT;

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: port,
    },
  });

  await app.startAllMicroservices();
  await app.listen(port);

  Logger.log(`🚀 Payment is running`);
}

bootstrap();
