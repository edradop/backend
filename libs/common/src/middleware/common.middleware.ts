import { ValidationPipe, VersioningType, type INestApplication } from '@nestjs/common';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { HttpExceptionFilter } from '../filter';
import { IS_PRODUCTION } from '@edd/config';

function commonMiddleware(app: INestApplication): INestApplication {
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
      contentSecurityPolicy: IS_PRODUCTION ? undefined : false,
      crossOriginEmbedderPolicy: IS_PRODUCTION ? undefined : false,
    }),
  );
  if (IS_PRODUCTION) {
    app.enableCors();
  }

  return app;
}

export { commonMiddleware };
