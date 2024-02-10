import { HttpEnvironmentService } from '@edd/config/module/environment';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

@Injectable()
export class AnalyticServiceMiddleware implements NestMiddleware {
  constructor(private readonly httpEnvironmentService: HttpEnvironmentService) {}
  private proxy = createProxyMiddleware({
    target: this.httpEnvironmentService.url('analytic'),
    pathRewrite: {
      '/analytic': '/',
    },
    secure: false,
  });

  use(req: Request, res: Response, next: () => void) {
    //console.log(res);
    this.proxy(req, res, next);
  }
}
