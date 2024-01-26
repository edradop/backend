import { Controller, Get } from '@nestjs/common';
import { StorageService } from '../service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('storage')
@Controller({ path: 'storage', version: '1' })
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Get()
  getHello(): string {
    return this.storageService.getHello();
  }
}
