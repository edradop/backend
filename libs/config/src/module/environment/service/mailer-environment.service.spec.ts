import { Test, TestingModule } from '@nestjs/testing';
import { MailerEnvironmentService } from './mailer-environment.service';

describe('MailerEnvironmentService', () => {
  let service: MailerEnvironmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailerEnvironmentService],
    }).compile();

    service = module.get<MailerEnvironmentService>(MailerEnvironmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
