import { Test } from '@nestjs/testing';
import { EncryptTestService } from './encrypt-test.service';
import { EncryptTestDto } from './dto/encrypt-test.dto';
import { DecryptTestDto } from './dto/decrypt-test.dto';
import { encryptChar } from 'encrypt-char';

// Mock the encryptChar library
jest.mock('encrypt-char', () => ({
  hardEncode: jest.fn((text: string) => `encrypted-${text}`),
  hardDecode: jest.fn((text: string) => text.replace('encrypted-', '')),
}));

describe('EncryptTestService', () => {
  let encryptTestService: EncryptTestService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [EncryptTestService],
    }).compile();

    encryptTestService = moduleRef.get<EncryptTestService>(EncryptTestService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('encryptText', () => {
    it('should encrypt text', () => {
      const textValue = 'Hello, NestJS!';
      const encryptedTextValue = `encrypted-${textValue}`;
      const encryptTestDto: EncryptTestDto = { textValue };

      const result = encryptTestService.encryptText(encryptTestDto);

      expect(result.message).toEqual('Encryption Successfully');
      expect(result.result).toEqual(encryptedTextValue);
      expect(encryptChar.hardEncode).toHaveBeenCalledWith(
        textValue,
        expect.anything(),
        expect.anything(),
      );
    });
  });

  describe('decryptText', () => {
    it('should decrypt text', () => {
      const encryptedTextValue = 'encrypted-Hello, NestJS!';
      const decryptedTextValue = 'Hello, NestJS!';
      const decryptTestDto: DecryptTestDto = { encryptedTextValue };

      const result = encryptTestService.decryptText(decryptTestDto);

      expect(result.message).toEqual('Decryption Successfully');
      expect(result.result).toEqual(decryptedTextValue);
      expect(encryptChar.hardDecode).toHaveBeenCalledWith(
        encryptedTextValue,
        expect.anything(),
        expect.anything(),
      );
    });
  });
});
