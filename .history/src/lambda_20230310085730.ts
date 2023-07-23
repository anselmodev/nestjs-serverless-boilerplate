import { configure as serverlessExpress } from '@vendia/serverless-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { GlobalExceptionFilter } from './exceptions/global.exception';
import * as Sentry from '@sentry/node';
import helmet from 'helmet';
import { AMBIENT } from './constants/environment.constants';

let cachedServer;

export const handler = async (event, context) => {
  if (AMBIENT !== 'development') {
    Sentry.init({
      dsn: 'https://a21e9b5aa8e9406aba54f691459c36e8@o479314.ingest.sentry.io/4504233357082624',
      tracesSampleRate: 1.0,
      environment: AMBIENT,
    });
  }

  if (!cachedServer) {
    const nestApp = await NestFactory.create<NestExpressApplication>(AppModule);
    nestApp.enableCors({
      origin: '*',
      methods: ['GET', 'POST', 'OPTIONS'],
    });
    nestApp.use(
      helmet({
        crossOriginEmbedderPolicy: false,
        contentSecurityPolicy: {
          directives: {
            ...helmet.contentSecurityPolicy.getDefaultDirectives(),
            'img-src': ["'self'", 'cdn.byefive.com.br'],
          },
        },
      }),
    );
    nestApp.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );
    nestApp.useGlobalFilters(new GlobalExceptionFilter());
    nestApp.useStaticAssets(join(__dirname, '..', 'public'));
    nestApp.setBaseViewsDir(join(__dirname, '..', 'views'));
    nestApp.setViewEngine('hbs');

    await nestApp.init();
    cachedServer = serverlessExpress({
      app: nestApp.getHttpAdapter().getInstance(),
    });
  }

  return cachedServer(event, context);
};
