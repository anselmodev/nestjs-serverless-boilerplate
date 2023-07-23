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
      // Mock data
      const mockInput: EncryptTestDto = { textValue: textValue };

      // Mock the service method
      // jest.spyOn(service, 'encryptText').mockResolvedValue(encryptedText);
      jest
        .spyOn(service, 'encryptText')
        .mockImplementation(() => ({ message: '', result: encryptedText }));

      // Call the controller method
      const result = await controller.encryptText(mockInput);

      // Assert the result
      expect(result).toBe(textValue);
    });
  });
});
