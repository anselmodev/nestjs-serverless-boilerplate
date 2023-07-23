import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EncryptTestService } from './encrypt-test.service';
import { CreateEncryptTestDto } from './dto/create-encrypt-test.dto';
import { UpdateEncryptTestDto } from './dto/update-encrypt-test.dto';

@Controller('encrypt-test')
export class EncryptTestController {
  constructor(private readonly encryptTestService: EncryptTestService) {}

  @Post()
  create(@Body() createEncryptTestDto: CreateEncryptTestDto) {
    return this.encryptTestService.create(createEncryptTestDto);
  }

  @Get()
  findAll() {
    return this.encryptTestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.encryptTestService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEncryptTestDto: UpdateEncryptTestDto,
  ) {
    return this.encryptTestService.update(+id, updateEncryptTestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.encryptTestService.remove(+id);
  }
}
