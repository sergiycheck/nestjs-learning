import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalPipes(
  //   new ValidationPipe({
  // TODO: bug or issue with the whitelist property
  // dont use it because you will get empty input in the
  // resolver or mutation method
  //     // whitelist: true,
  //     transform: true,
  //     transformOptions: { enableImplicitConversion: true },
  //   }),
  // );

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3100);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
