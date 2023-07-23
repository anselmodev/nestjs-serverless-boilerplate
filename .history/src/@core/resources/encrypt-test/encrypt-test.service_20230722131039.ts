import { Injectable } from '@nestjs/common';
import { EncryptTestDto } from './dto/encrypt-test.dto';
import { DecryptTestDto } from './dto/decrypt-test.dto';
import { encryptChar } from 'encrypt-char';
import {
  KEYCHAR,
  KEYCHAR_SECRET,
} from 'src/@core/shared/constants/environment.constants';

@Injectable()
export class EncryptTestService {
  encryptText(encryptTestDto: EncryptTestDto) {
    return encryptChar.hardEncode(
      encryptTestDto.textValue,
      KEYCHAR,
      KEYCHAR_SECRET,
    );
  }

  decryptText(decryptTestDto: DecryptTestDto) {
    return encryptChar.hardDecode(
      decryptTestDto.encryptedTextValue,
      KEYCHAR,
      KEYCHAR_SECRET,
    );
  }
}
