import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { EncryptTestModule } from './@core/resources/encrypt-test/encrypt-test.module';
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
    EncryptTestModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
