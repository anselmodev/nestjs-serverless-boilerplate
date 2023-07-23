import { PartialType } from '@nestjs/mapped-types';
import { CreateEncryptTestDto } from './create-encrypt-test.dto';

export class UpdateEncryptTestDto extends PartialType(CreateEncryptTestDto) {}
