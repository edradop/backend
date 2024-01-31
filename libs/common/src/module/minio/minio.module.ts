import { Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './definition';
import { MinioService } from './service';

@Module({
  providers: [MinioService],
  exports: [MinioService],
})
export class MinioModule extends ConfigurableModuleClass {}
