import { Transform } from 'class-transformer';
import { MinLength, IsString } from 'class-validator';

export class EncryptTestDto {
  @IsString()
  @MinLength(3, {
    message: 'A minimum of 3 digits is required for encrypt text.',
  })
  @Transform(({ value }) => value.trim())
  textValue: string;

  @IsString()
  @MinLength(3, {
    message: 'A minimum of 3 digits is required for decrypt text.',
  })
  @Transform(({ value }) => value.trim())
  encryptedTextValue: string;
}
