import { Test, TestingModule } from '@nestjs/testing';
import { DbExceptionHandlerService } from './db-exception-handler.service';

describe('DbExceptionHandlerService', () => {
  let service: DbExceptionHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbExceptionHandlerService],
    }).compile();

    service = module.get<DbExceptionHandlerService>(DbExceptionHandlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
