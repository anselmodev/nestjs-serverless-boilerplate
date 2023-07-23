import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { GlobalExceptionFilter } from './exceptions/global.exception';
import * as Sentry from '@sentry/node';
import helmet from 'helmet';
import { AMBIENT } from './constants/environment.constants';

async function bootstrap() {
  if (AMBIENT !== 'development') {
    Sentry.init({
      dsn: 'https://a21e9b5aa8e9406aba54f691459c36e8@o479314.ingest.sentry.io/4504233357082624',
      tracesSampleRate: 1.0,
      environment: AMBIENT,
    });
  }

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
  });
  app.use(
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
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(4001);
}
bootstrap();
