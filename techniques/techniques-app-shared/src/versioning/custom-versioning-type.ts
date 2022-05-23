import { VersioningType, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Request } from 'express';

@Module({})
export class AppModule {}

// Example extractor that pulls out a list of versions from a custom header and turns it into a sorted array.
// This example uses Fastify, but Express requests can be processed in a similar way.
const extractor = (request: Request): string | string[] =>
  [request.headers['custom-versioning-field'] ?? '']
    .flatMap((v) => v.toString().split(','))
    .filter((v) => !!v)
    .sort()
    .reverse();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.CUSTOM,
    extractor,
  });
  await app.listen(3000);
}
bootstrap();
