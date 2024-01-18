import { Test, TestingModule } from '@nestjs/testing';
import { EdradopController } from './edradop.controller';
import { EdradopService } from './edradop.service';

describe('EdradopController', () => {
  let appController: EdradopController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EdradopController],
      providers: [EdradopService],
    }).compile();

    appController = app.get<EdradopController>(EdradopController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
