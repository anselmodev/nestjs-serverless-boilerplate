import { Injectable } from '@nestjs/common';
import { EncryptTestDto } from './dto/encrypt-test.dto';
import { DecryptTestDto } from './dto/decrypt-test.dto';
import { encryptChar } from 'encrypt-char';
import {
  KEYCHAR,
  KEYCHAR_SECRET,
} from 'src/@core/shared/constants/environment.constants';
import { ApplicationException } from 'src/@core/shared/exceptions/application.exception';

@Injectable()
export class EncryptTestService {
  encryptText(encryptTestDto: EncryptTestDto) {
    try {
      throw new ApplicationException({
        success: false,
        message: 'Mensagem de erro!',
        status: 401,
      });
    } catch (err) {
      return err;
    }
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
