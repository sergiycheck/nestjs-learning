import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

//passport is the most popular node.js authentication library.
//https://github.com/jaredhanson/passport

// successfully used in many production apps
// @nestjs/passport
//passport executes a series of steps to
// authenticate a user by verifying credentials (jwt)
//manage authenticated state (by issuing a portable token, suck as a JWT or express session (https://github.com/expressjs/session))
//passport strategies
//http://www.passportjs.org/

//complete solution
// https://github.com/nestjs/nest/tree/master/sample/19-auth-jwt

//for any passport strategy you'll always need the @nestjs/passport and passport packages
//the you'll need to i the strategy-specific package (passport-jwt or passport-local) that implements the particular authentication strategy you are building.
// install type definitions  as shown above with @types/passport-local
