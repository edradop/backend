import { ValidationPipe, VersioningType, type INestApplication } from '@nestjs/common';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { HttpExceptionFilter } from '../filter';

function commonMiddleware(app: INestApplication): INestApplication {
  const isProduction = process.env.NODE_ENV === 'production';

  app.use(cookieParser());
  // app.use(csurf());
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
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

export { commonMiddleware };
