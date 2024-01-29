import { Module } from '@nestjs/common';
import { HttpExceptionService, PromiseHandlerService, DbExceptionHandlerService } from './service';

@Module({
  providers: [HttpExceptionService, PromiseHandlerService, DbExceptionHandlerService],
  exports: [HttpExceptionService, PromiseHandlerService, DbExceptionHandlerService],
})
export class HttpExceptionModule {}
