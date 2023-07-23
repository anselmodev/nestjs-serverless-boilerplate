import { Injectable } from '@nestjs/common';
import { EncryptTestDto } from './dto/encrypt-test.dto';
import { DecryptTestDto } from './dto/decrypt-test.dto';
import { encryptChar } from 'encrypt-char';
import {
  KEYCHAR,
  KEYCHAR_SECRET,
} from '../../shared/constants/environment.constants';

@Injectable()
export class EncryptTestService {
  encryptText(encryptTestDto: EncryptTestDto) {
    return {
      message: 'Encryption Successfully',
      result: encryptChar.hardEncode(
        encryptTestDto.textValue,
        KEYCHAR,
        KEYCHAR_SECRET,
      ),
    };
  }

  decryptText(decryptTestDto: DecryptTestDto) {
    return {
      message: 'Decryption Successfully',
      result: encryptChar.hardDecode(
        decryptTestDto.encryptedTextValue,
        KEYCHAR,
        KEYCHAR_SECRET,
      ),
    };
  }
}
