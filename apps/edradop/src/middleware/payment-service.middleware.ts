import { HttpEnvironmentService } from '@edd/config/module/environment';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

@Injectable()
export class PaymentServiceMiddleware implements NestMiddleware {
  constructor(private readonly httpEnvironmentService: HttpEnvironmentService) {}
  private proxy = createProxyMiddleware({
    target: this.httpEnvironmentService.url('payment'),
    pathRewrite: {
      '/payment': '/',
    },
    secure: false,
  });

  use(req: Request, res: Response, next: () => void) {
    this.proxy(req, res, next);
  }
}
