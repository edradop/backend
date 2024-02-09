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
      retryAttempts: 5,
      retryDelay: 3000,
    },
  });

  await app.startAllMicroservices();
  return app;
}

export { connectMicroServicesMiddleware };
