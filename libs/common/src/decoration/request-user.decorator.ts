import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';

export const RequestUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  Logger.log(data);
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
