import { Controller, Post, Body } from '@nestjs/common';
import { EncryptTestService } from './encrypt-test.service';
import { CreateEncryptTestDto } from './dto/encrypt-test.dto';

@Controller('encrypt-test')
export class EncryptTestController {
  constructor(private readonly encryptTestService: EncryptTestService) {}

  @Post()
  encryptText(@Body() createEncryptTestDto: CreateEncryptTestDto) {
    return this.encryptTestService.encryptText(createEncryptTestDto);
  }

  @Post()
  decryptText(@Body() createEncryptTestDto: CreateEncryptTestDto) {
    return this.encryptTestService.decryptText(createEncryptTestDto);
  }
}
