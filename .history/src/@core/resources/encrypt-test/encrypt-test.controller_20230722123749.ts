import { Controller, Post, Body } from '@nestjs/common';
import { EncryptTestService } from './encrypt-test.service';
import { EncryptTestDto } from './dto/encrypt-test.dto';
import { DecryptTestDto } from './dto/decrypt-test.dto';

@Controller('encrypt-test')
export class EncryptTestController {
  constructor(private readonly encryptTestService: EncryptTestService) {}

  @Post('encode')
  encryptText(@Body() encryptTestDto: EncryptTestDto) {
    return this.encryptTestService.encryptText(encryptTestDto);
  }

  @Post('decode')
  decryptText(@Body() decryptTestDto: DecryptTestDto) {
    return this.encryptTestService.decryptText(decryptTestDto);
  }
}
