import { HttpException } from '@nestjs/common';

type TException = {
  success?: boolean;
  message: string;
  status: number;
  errorMessage?: any;
};

export class ApplicationException extends HttpException {
  constructor({ success, message, status, errorMessage }: TException) {
    super({ status, message, timeStamp: new Date() } || 'Error', status || 400);

    if (errorMessage?.length) {
      console.log('ERROR MESSAGE: ', errorMessage);
    }
  }
}
