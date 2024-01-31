import { EnvironmentService } from '@edd/config/module/environment';
import { INestApplication } from '@nestjs/common';
import * as session from 'express-session';

export function middleware(app: INestApplication): INestApplication {
  const isProduction = process.env.NODE_ENV === 'production';
  const portService = app.get(EnvironmentService);
  app.use(
    session({
      // Requires 'store' setup for production
      secret: portService.sessionSecret,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: isProduction },
    }),
  );
  return app;
}
