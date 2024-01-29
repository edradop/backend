import { Module } from '@nestjs/common';
import { AnalyticController } from './controller';
import { AnalyticService } from './service';
import { ConfigModule } from '@nestjs/config';
import { PortModule } from '@edd/config/module/port';

@Module({
  imports: [ConfigModule.forRoot(), PortModule],
  controllers: [AnalyticController],
  providers: [AnalyticService],
})
export class AnalyticModule {}
