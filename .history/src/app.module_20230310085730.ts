import { JwtAuthGuard } from './resources/sign-in/guards/jwt-auth.guard';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { CheckTokenMiddleware } from './middlewares/check-token.middleware';
import { SignInModule } from './resources/sign-in/sign-in.module';
import { APP_GUARD } from '@nestjs/core';
import { ApiRequestModule } from './providers/api-request/api-request.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      // used by  "yarn off:<stage> command
      envFilePath:
        process.env.STAGE_NAME === 'prod'
          ? '.env.prod'
          : process.env.STAGE_NAME === 'hml'
          ? '.env.hml'
          : '.env',
    }),
    SignInModule,
    ApiRequestModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckTokenMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.POST });
  }
}
