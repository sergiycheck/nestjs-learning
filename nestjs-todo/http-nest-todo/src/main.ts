import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './root-module/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  configureSwagger(app);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      // it converted string boolean to boolean
      transformOptions: { enableImplicitConversion: true, exposeDefaultValues: true },
    }),
  );

  const configService = app.get(ConfigService);
  const PORT = +configService.get('PORT');

  await app.listen(PORT);
}
bootstrap();

export function configureSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('nestjs http todo')
    .setVersion('1.0')
    .build();
  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, doc);
}