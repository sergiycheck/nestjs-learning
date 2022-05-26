import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
// import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(helmet());
  app.enableCors();
  // app.use(csurf());
  await app.listen(3000);
}
bootstrap();

//security libraries
//encryption and hashing crypto brypt (https://github.com/kelektiv/node.bcrypt.js#readme)
//headers helmet (https://github.com/helmetjs/helmet)
//cors (https://github.com/expressjs/cors#configuration-options)

// csrf protection (https://github.com/expressjs/csurf)
//Create a middleware for CSRF token creation and validation.
//This middleware adds a req.csrfToken() function to make a token
//which should be added to requests which mutate state, within a hidden
//form field, query-string etc. This token is validated against the visitor's
//session or csrf cookie.
