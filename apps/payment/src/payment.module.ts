import { Module } from '@nestjs/common';
import { PaymentController } from './controller';
import { PaymentService } from './service';
import { ConfigModule } from '@nestjs/config';
import { PortModule } from '@edd/config/module/port';

@Module({
  imports: [ConfigModule.forRoot(), PortModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
