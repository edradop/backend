import { Controller, Get } from '@nestjs/common';
import { CommunicationService } from './communication.service';
import { EventPattern } from '@nestjs/microservices';
import { CreateUserEvent } from './create-user.event';

@Controller()
export class CommunicationController {
  constructor(private readonly communicationService: CommunicationService) {}

  @Get()
  getData() {
    return this.communicationService.getData();
  }

  @EventPattern('user_created')
  handleUserCreated(data: CreateUserEvent) {
    this.communicationService.handleUserCreated(data);
  }
}
