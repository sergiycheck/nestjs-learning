import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      //automatically remove noo-whitelisted properties (those without any decorator in the validation class)
      whitelist: true,
      forbidNonWhitelisted: true, // return error on non whitelisted properties present
      transform: true, //transform payloads to be objects typed according to their DTO classes. enabling auto transform
    }),
    // { disableErrorMessages: true }
  );

  await app.listen(3000);
}
bootstrap();

//https://github.com/typestack/class-validator
