import { Module } from '@nestjs/common';
import { AnalyticController } from './controller';
import { AnalyticService } from './service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AnalyticController],
  providers: [AnalyticService],
})
export class AnalyticModule {}
