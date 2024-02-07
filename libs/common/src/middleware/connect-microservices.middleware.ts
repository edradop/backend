import { type INestApplication } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

async function connectMicroServicesMiddleware(
  app: INestApplication,
  host: string,
  port: number,
): Promise<INestApplication> {
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: port,
      host: host,
    },
  });
  await app.startAllMicroservices();
  return app;
}

export { connectMicroServicesMiddleware };
