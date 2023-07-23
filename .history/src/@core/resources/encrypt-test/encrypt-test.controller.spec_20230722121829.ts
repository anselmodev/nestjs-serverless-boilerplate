import { Test, TestingModule } from '@nestjs/testing';
import { EncryptTestController } from './encrypt-test.controller';
import { EncryptTestService } from './encrypt-test.service';

describe('EncryptTestController', () => {
  let controller: EncryptTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EncryptTestController],
      providers: [EncryptTestService],
    }).compile();

    controller = module.get<EncryptTestController>(EncryptTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
