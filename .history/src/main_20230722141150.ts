import { join } from 'path';
import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { GlobalExceptionFilter } from './@core/shared/exceptions/global.exception';
import { PORT } from './@core/shared/constants/environment.constants';
import { ResponseInterceptor } from './@core/shared/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });
  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          ...helmet.contentSecurityPolicy.getDefaultDirectives(),
          //'img-src': ["'self'", 'cdn.yourdomain.com'],
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
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useStaticAssets(join(__dirname, '../src/@core/presenters', 'assets'));
  app.setBaseViewsDir(join(__dirname, '../src/@core/presenters', 'ui'));
  app.setViewEngine('hbs');

  await app.listen(PORT);
}
bootstrap();
