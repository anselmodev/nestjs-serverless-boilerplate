import { configure as serverlessExpress } from '@vendia/serverless-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { GlobalExceptionFilter } from './exceptions/global.exception';
import helmet from 'helmet';

let cachedServer;

export const handler = async (event, context) => {
  if (!cachedServer) {
    const nestApp = await NestFactory.create<NestExpressApplication>(AppModule);
    nestApp.enableCors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    });
    nestApp.use(
      helmet({
        crossOriginEmbedderPolicy: false,
        contentSecurityPolicy: {
          directives: {
            ...helmet.contentSecurityPolicy.getDefaultDirectives(),
            //'img-src': ["'self'", 'cdn.byefive.com.br'],
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
    nestApp.setBaseViewsDir(join(__dirname, '../src', 'public'));
    nestApp.setViewEngine('hbs');

    await nestApp.init();
    cachedServer = serverlessExpress({
      app: nestApp.getHttpAdapter().getInstance(),
    });
  }

  return cachedServer(event, context);
};
