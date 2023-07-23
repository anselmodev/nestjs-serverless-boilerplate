import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { IncomingMessage } from 'http';
import { HttpException, HttpStatus } from '@nestjs/common';

export const getStatusCode = (exception: unknown): number => {
  return exception instanceof HttpException
    ? exception.getStatus()
    : HttpStatus.INTERNAL_SERVER_ERROR;
};

export const getErrorMessage = (exception: any): string => {
  const prepareMessage = exception?.response?.message;

  if (typeof prepareMessage === 'object') {
    return prepareMessage[0];
  } else if (typeof prepareMessage === 'string') {
    return prepareMessage;
  } else {
    return exception.toString();
  }
};

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  defaultMessage(statusCode: number, message: string): string {
    return statusCode === 500 ? 'Internal Server Error' : message;
  }

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<IncomingMessage>();
    const code = getStatusCode(exception);
    const message = getErrorMessage(exception);

    response.status(code).json({
      success: false,
      message,
      errorCode: 1234,
      timestamp: new Date().toISOString(),
      statusCode: code,
    });
  }
}
