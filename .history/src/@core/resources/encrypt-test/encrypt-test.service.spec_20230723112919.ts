import { Test } from '@nestjs/testing';
import { EncryptTestService } from './encrypt-test.service';
import { EncryptTestDto } from './dto/encrypt-test.dto';
import { DecryptTestDto } from './dto/decrypt-test.dto';

// Mock the encryptChar library
// jest.mock('encrypt-char', () => ({
//   hardEncode: jest.fn((text: string) => `encrypted-${text}`),
//   hardDecode: jest.fn((text: string) => text.replace('encrypted-', '')),
// }));

describe('EncryptTestService', () => {
  let encryptTestService: EncryptTestService;
  let encryptedText;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [EncryptTestService],
    }).compile();

    encryptTestService = moduleRef.get<EncryptTestService>(EncryptTestService);
  });

  describe('encryptText', () => {
    let encryptedText;

    it('should encrypt text', () => {
      const textValue = 'Hello, NestJS!';
      const encryptTestDto: EncryptTestDto = { textValue };

      encryptedText = encryptTestService.encryptText(encryptTestDto);

      expect(encryptedText.message).toEqual('Encryption Successfully');
      expect(encryptedText.result).toEqual(encryptedText);
    });

    afterEach(() => {
      encryptedText = encryptedText;
    });
  });

  describe('decryptText', () => {
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
