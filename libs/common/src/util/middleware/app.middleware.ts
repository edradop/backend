import { ValidationPipe, type INestApplication } from '@nestjs/common';
import * as compression from 'compression';
import helmet from 'helmet';

export function commonMiddleware(app: INestApplication): INestApplication {
  const isProduction = process.env.NODE_ENV === 'production';

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.use(compression());
  app.use(
    helmet({
      contentSecurityPolicy: isProduction ? undefined : false,
      crossOriginEmbedderPolicy: isProduction ? undefined : false,
    }),
  );
  if (isProduction) {
    app.enableCors();
  }

  return app;
}
