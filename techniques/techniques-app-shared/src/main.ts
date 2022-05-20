import { Sequelize } from 'sequelize-typescript';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './root-module/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
//configuring dotenv breaks multer. Multer does not work with configured dotenv
// import * as dotenv from 'dotenv';
// dotenv.config();
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // run on model change
  // const sequelize = app.get(Sequelize);
  // await sequelize.sync({ force: true });

  const config = new DocumentBuilder()
    .setTitle('nestjs techniques trying')
    .setVersion('1.0')
    .build();
  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, doc);
  app.use(cors());
  await app.listen(3000);
  console.log(`App is running on ${await app.getUrl()}`);
}
bootstrap();
