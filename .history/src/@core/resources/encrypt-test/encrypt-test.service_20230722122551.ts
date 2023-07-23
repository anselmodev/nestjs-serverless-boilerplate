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
  create(createEncryptTestDto: CreateEncryptTestDto) {
    return {
      result: encryptChar.hardDecode(
        createEncryptTestDto.textValue,
        KEYCHAR,
        KEYCHAR_SECRET,
      ),
    };
  }

  findAll() {
    return `This action returns all encryptTest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} encryptTest`;
  }

  update(id: number, updateEncryptTestDto: UpdateEncryptTestDto) {
    return `This action updates a #${id} encryptTest`;
  }

  remove(id: number) {
    return `This action removes a #${id} encryptTest`;
  }
}
