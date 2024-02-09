import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { EdradopService } from '../service';

@ApiTags()
@Controller({ version: '1' })
export class EdradopController {
  constructor(private readonly appService: EdradopService) {}

  @Get()
  getHello(): Observable<number> {
    return this.appService.getHello();
  }
}
