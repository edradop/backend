import { SESSION_SECRET, SESSION_SECRET_DEFAULT } from '@edd/common';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as session from 'express-session';

export function middleware(app: INestApplication): INestApplication {
  const isProduction = process.env.NODE_ENV === 'production';
  const config = app.get(ConfigService);
  app.use(
    session({
      // Requires 'store' setup for production
      secret: config.get(SESSION_SECRET, SESSION_SECRET_DEFAULT),
      resave: false,
      saveUninitialized: true,
      cookie: { secure: isProduction },
    }),
  );
  return app;
}
