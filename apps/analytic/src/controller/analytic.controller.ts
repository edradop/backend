import { Controller, Get } from '@nestjs/common';
import { AnalyticService } from '../service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('analytic')
@Controller({ path: 'analytic', version: '1' })
export class AnalyticController {
  constructor(private readonly analyticService: AnalyticService) {}

  @Get()
  getHello(): string {
    return this.analyticService.getHello();
  }
}
