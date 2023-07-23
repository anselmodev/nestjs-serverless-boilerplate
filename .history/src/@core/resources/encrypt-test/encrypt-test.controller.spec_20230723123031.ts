import { Test } from '@nestjs/testing';
import { EncryptTestController } from './encrypt-test.controller';
import { EncryptTestService } from './encrypt-test.service';
import { EncryptTestDto } from './dto/encrypt-test.dto';

describe('EncryptTestController', () => {
  let controller: EncryptTestController;
  let service: EncryptTestService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [EncryptTestController],
      providers: [EncryptTestService],
    }).compile();

    controller = moduleRef.get<EncryptTestController>(EncryptTestController);
    service = moduleRef.get<EncryptTestService>(EncryptTestService);
  });

  describe('encryptText', () => {
    const encryptedText = '1Zf1r6gK9IJAK1e7D9vWpX2WGXi';
    const textValue = 'Hello, NestJS!';

    it('should return the encrypted text', async () => {
      const mockInput: EncryptTestDto = { textValue: textValue };

      jest
        .spyOn(service, 'encryptText')
        .mockImplementation(() => ({ message: '', result: encryptedText }));

      const encryptResult = await controller.encryptText(mockInput);

      expect(encryptResult.result).toBe(encryptedText);
    });
  });
});
