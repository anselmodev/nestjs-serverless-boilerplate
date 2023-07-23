import { Test } from '@nestjs/testing';
import { EncryptTestController } from './encrypt-test.controller';
import { EncryptTestService } from './encrypt-test.service';
import { EncryptTestDto } from './dto/encrypt-test.dto';
import { DecryptTestDto } from './dto/decrypt-test.dto';

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

  describe('encrypt and decrypt text', () => {
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

    it('should return the decrypted text', async () => {
      const mockInput: DecryptTestDto = { encryptedTextValue: encryptedText };

      jest
        .spyOn(service, 'encryptText')
        .mockImplementation(() => ({ message: '', result: textValue }));

      const decryptResult = await controller.decryptText(mockInput);

      expect(decryptResult.result).toBe(textValue);
    });
  });
});
