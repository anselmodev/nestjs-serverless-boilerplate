import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ApplicationException } from '../shared/exceptions/application.exception';
import * as bcrypt from 'bcrypt';
import { BEARER_SECRET } from '../shared/constants/environment.constants';
import { AUTH_MESSAGES } from '../shared/constants/messages.constants';

export class CheckTokenMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    let getToken: string | string[] = req.headers['authorization'];

    if (!getToken) {
      throw new ApplicationException({
        message: AUTH_MESSAGES.missingTokenMessage,
        status: 401,
        errorMessage: `[CheckTokenMiddleware]: ${AUTH_MESSAGES.missingTokenMessageError}`,
      });
    }

    getToken = getToken.split(' ');
    const matchPass = await bcrypt.compare(BEARER_SECRET || '', getToken[1]);

    if (!matchPass) {
      throw new ApplicationException({
        message: AUTH_MESSAGES.invalidTokenMessage,
        status: 401,
        errorMessage: `[CheckTokenMiddleware]: ${AUTH_MESSAGES.invalidTokenMessageError}`,
      });
    }
    next();
  }
}
