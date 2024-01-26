import { Controller, Get } from '@nestjs/common';
import { EdradopService } from '../service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags()
@Controller({ path: 'authority', version: '1' })
export class EdradopController {
  constructor(private readonly appService: EdradopService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
