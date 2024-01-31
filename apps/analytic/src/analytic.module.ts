import { Module } from '@nestjs/common';
import { AnalyticController } from './controller';
import { AnalyticService } from './service';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentModule } from '@edd/config/module/environment';

@Module({
  imports: [ConfigModule.forRoot(), EnvironmentModule],
  controllers: [AnalyticController],
  providers: [AnalyticService],
})
export class AnalyticModule {}
