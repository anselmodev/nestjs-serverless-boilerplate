import { Test } from '@nestjs/testing';
import { EncryptTestService } from './encrypt-test.service';
import { EncryptTestDto } from './dto/encrypt-test.dto';
import { DecryptTestDto } from './dto/decrypt-test.dto';

describe('EncryptTestService', () => {
  let encryptTestService: EncryptTestService;
  let encryptedText = '1Zf1r6gK9IJAK1e7D9vWpX2WGXi';

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [EncryptTestService],
    }).compile();

    encryptTestService = moduleRef.get<EncryptTestService>(EncryptTestService);
  });

  describe('encrypt and decrypt text', () => {
    it('should encrypt text', () => {
      const textValue = 'Hello, NestJS!';
      const encryptTestDto: EncryptTestDto = { textValue };

      const encryptResult = encryptTestService.encryptText(encryptTestDto);

      expect(encryptResult.message).toEqual('Encryption Successfully');
      expect(encryptResult.result).toEqual(encryptedText);
    });

    it('should decrypt text', () => {
      const decryptedTextValue = 'Hello, NestJS!';
      const decryptTestDto: DecryptTestDto = {
        encryptedTextValue: encryptedText,
      };

      const result = encryptTestService.decryptText(decryptTestDto);

      expect(result.message).toEqual('Decryption Successfully');
      expect(result.result).toEqual(decryptedTextValue);
    });
  });
});
