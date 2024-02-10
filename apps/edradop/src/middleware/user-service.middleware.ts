import { HttpEnvironmentService } from '@edd/config/module/environment';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

@Injectable()
export class UserServiceMiddleware implements NestMiddleware {
  constructor(private readonly httpEnvironmentService: HttpEnvironmentService) {}
  private proxy = createProxyMiddleware({
    target: this.httpEnvironmentService.url('user'),
    pathRewrite: {
      '/user': '/',
    },
    secure: false,
  });

  use(req: Request, res: Response, next: () => void) {
    this.proxy(req, res, next);
  }
}
