import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLogger } from './injecting-custom-logger/my-logger.service';
// import { MyLogger } from './extend-logger/my-logger.service';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule, { logger: false });

  // const app = await NestFactory.create(AppModule, {
  //   logger: ['error', 'warn'],
  // });

  // const app = await NestFactory.create(AppModule, {
  //   logger: console,
  // });
  // const app = await NestFactory.create(AppModule);
  //we set the bufferLogs to true to make sure all logs will be
  //buffered until a custom logger is attached
  //if the init process fails, Nest will fallback to the original
  // ConsoleLogger
  const app = await NestFactory.create(
    AppModule,
    { bufferLogs: true },
    // { logger: false }, // nothing will be logged until you call useLogger
    // { logger: ['error', 'warn'] },
  );
  //retrieving singleton instance of a logger for use by Nest
  // app.useLogger(app.get(MyLogger));

  app.useLogger(new MyLogger(app.get(ConfigService)));

  await app.listen(3000);
}
bootstrap();

//loggers
// https://github.com/winstonjs/winston
