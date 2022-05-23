import { VersioningType, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

@Module({})
export class AppModule {}

//It should then contain a key-value pair that represents
//the version to use for the request, such as
//Accept: application/json;v=2.

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.MEDIA_TYPE,
    key: 'v=',
  });
  await app.listen(3000);
}
bootstrap();
