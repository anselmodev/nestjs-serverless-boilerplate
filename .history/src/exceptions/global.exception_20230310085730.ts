import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { IncomingMessage } from 'http';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { AMBIENT } from '../constants/environment.constants';

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
  }
};

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<IncomingMessage>();
    const code = getStatusCode(exception);
    const message = getErrorMessage(exception);

    if (AMBIENT !== 'development') {
      Sentry.captureException(exception);
    }

    response.status(code).json({
      statusCode: code,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: message,
    });
  }
}
