import { Injectable } from '@nestjs/common';
import { CreateEncryptTestDto } from './dto/create-encrypt-test.dto';
import { UpdateEncryptTestDto } from './dto/update-encrypt-test.dto';
import { encryptChar } from 'encrypt-char';
import {
  KEYCHAR,
  KEYCHAR_SECRET,
} from 'src/@core/shared/constants/environment.constants';

@Injectable()
export class EncryptTestService {
  encryptText(createEncryptTestDto: CreateEncryptTestDto) {
    return {
      result: encryptChar.hardEncode(
        createEncryptTestDto.textValue,
        KEYCHAR,
        KEYCHAR_SECRET,
      ),
    };
  }

  decryptText(createEncryptTestDto: CreateEncryptTestDto) {
    return {
      result: encryptChar.hardDecode(
        createEncryptTestDto.encryptedTextValue,
        KEYCHAR,
        KEYCHAR_SECRET,
      ),
    };
  }
}
