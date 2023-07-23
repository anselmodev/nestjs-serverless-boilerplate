import { Module } from '@nestjs/common';
import { EncryptTestService } from './encrypt-test.service';
import { EncryptTestController } from './encrypt-test.controller';

@Module({
  controllers: [EncryptTestController],
  providers: [EncryptTestService],
})
export class EncryptTestModule {}
