import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './root-module/app.module';

import { FastifyCookieOptions } from '@fastify/cookie';
import cookie from '@fastify/cookie';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
  await app.register(cookie, {
    secret: 'my-secret', // for cookies signature
    parseOptions: {}, // options for parsing cookies
  } as FastifyCookieOptions);

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
