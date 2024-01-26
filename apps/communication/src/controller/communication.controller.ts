import { Controller, Get } from '@nestjs/common';
import { CommunicationService } from '../service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('communication')
@Controller({ path: 'communication', version: '1' })
export class CommunicationController {
  constructor(private readonly communicationService: CommunicationService) {}

  @Get()
  getData() {
    return this.communicationService.getData();
  }
}
