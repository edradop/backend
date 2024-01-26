import { Controller, Get } from '@nestjs/common';
import { PaymentService } from '../service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('payment')
@Controller({ path: 'payment', version: '1' })
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  getHello(): string {
    return this.paymentService.getHello();
  }
}
