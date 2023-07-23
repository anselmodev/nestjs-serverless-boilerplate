import { Controller, Get, Render } from '@nestjs/common';
import { VERSION } from './@core/shared/constants/environment.constants';
@Controller()
export class AppController {
  @Get()
  @Render('index')
  root() {
    return {
      version: VERSION,
      year: new Date().getFullYear(),
    };
  }
}
