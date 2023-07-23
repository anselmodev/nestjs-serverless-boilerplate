import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log(context.getHandler());
    return next.handle().pipe(
      map((data) => {
        return {
          success: true,
          message: 'Any Message',
          timestamp: new Date(),
          statusCode: 0,
          data,
        };
      }),
    );
  }
}
