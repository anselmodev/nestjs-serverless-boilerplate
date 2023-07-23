import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ApiRequestService } from './api-request.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 20000, // 20 sec timeout
    }),
  ],
  providers: [ApiRequestService],
  exports: [ApiRequestService],
})
export class ApiRequestModule {}
