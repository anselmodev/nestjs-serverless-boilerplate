import { Controller, Get, Render } from '@nestjs/common';
import { IsPublic } from './decorators/is-public.decorator';
import { VERSION } from './constants/environment.constants';
@Controller()
export class AppController {
  @IsPublic()
  @Get()
  @Render('index')
  root() {
    return {
      version: VERSION,
      year: new Date().getFullYear(),
    };
  }
}
