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
    // Intercepte a resposta que será enviada pelo controlador
    return next.handle().pipe(
      map((data) => {
        // Modifique a resposta conforme necessário
        // Neste exemplo, estou apenas encapsulando a resposta em um objeto "data"
        return {
          success: true,
          data,
        };
      }),
    );
  }
}
