import { Module } from '@nestjs/common';
import { EdradopController } from './edradop.controller';
import { EdradopService } from './edradop.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [EdradopController],
  providers: [EdradopService],
})
export class EdradopModule {}
