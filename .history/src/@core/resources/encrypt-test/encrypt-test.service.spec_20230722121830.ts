import { Test, TestingModule } from '@nestjs/testing';
import { EncryptTestService } from './encrypt-test.service';

describe('EncryptTestService', () => {
  let service: EncryptTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EncryptTestService],
    }).compile();

    service = module.get<EncryptTestService>(EncryptTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
