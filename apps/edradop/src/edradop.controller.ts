import { Controller, Get } from '@nestjs/common';
import { EdradopService } from './edradop.service';

@Controller()
export class EdradopController {
  constructor(private readonly appService: EdradopService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
