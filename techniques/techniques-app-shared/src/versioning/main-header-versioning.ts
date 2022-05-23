import { VersioningType, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

@Module({})
export class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'Custom-Header',
  });
  await app.listen(3000);
}
bootstrap();
