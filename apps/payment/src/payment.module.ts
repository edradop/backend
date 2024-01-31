import { Module } from '@nestjs/common';
import { PaymentController } from './controller';
import { PaymentService } from './service';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentModule } from '@edd/config/module/environment';

@Module({
  imports: [ConfigModule.forRoot(), EnvironmentModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
