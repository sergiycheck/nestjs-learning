import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './root-module/app.module';

import { FastifyCookieOptions } from '@fastify/cookie';
import cookie from '@fastify/cookie';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    // { logger: true }
  );

  await configureMiddlewares(app);
  configureSwagger(app);

  await app.listen(3030);
}

export async function configureMiddlewares(app: NestFastifyApplication) {
  //not works with fastify secure session
  // await app.register(cookie, {
  //   secret: 'my-secret', // for cookies signature
  //   parseOptions: {}, // options for parsing cookies
  // } as FastifyCookieOptions);

  const secretPath = path.join(process.cwd(), 'secret-key');
  if (fs.existsSync(secretPath)) {
    await app.register(import('@fastify/secure-session'), {
      // the name of the session cookie, defaults to 'session'
      cookieName: 'my-session-cookie',
      // adapt this to point to the directory where secret-key is located
      key: fs.readFileSync(secretPath),
      cookie: {
        path: '/',
        // options for setCookie, see https://github.com/fastify/fastify-cookie
      },
    });
  }

  await app.register(import('@fastify/compress'), {
    global: false,
    encodings: ['gzip', 'deflate'],
  });
}

export function configureSwagger(app: NestFastifyApplication) {
  const config = new DocumentBuilder()
    .setTitle('nestjs techniques fastify app')
    .setVersion('1.0')
    .build();
  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, doc);
}

bootstrap();
