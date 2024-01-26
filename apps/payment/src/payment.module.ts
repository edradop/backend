import { Module } from '@nestjs/common';
import { PaymentController } from './controller';
import { PaymentService } from './service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
