import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();

    return next.handle().pipe(
      map((data) => {
        return {
          success: true,
          message: data.message || 'Requisição Executada com Sucesso',
          timestamp: new Date(),
          errorCode: data.errorCode,
          statusCode: response.statusCode,
          data: data.data,
        };
      }),
    );
  }
}
