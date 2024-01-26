import { Module } from '@nestjs/common';
import { HttpExceptionService } from './service/http-exception.service';

@Module({
  providers: [HttpExceptionService],
  exports: [HttpExceptionService],
})
export class HttpExceptionModule {}
