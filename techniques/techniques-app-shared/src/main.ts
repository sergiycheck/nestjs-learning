import { Sequelize } from 'sequelize-typescript';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './root-module/app.module';
//configuring dotenv breaks multer. Multer does not work with configured dotenv
// import * as dotenv from 'dotenv';
// dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // run on model change
  // const sequelize = app.get(Sequelize);
  // await sequelize.sync({ force: true });

  await app.listen(3000);
  console.log(`App is running on ${await app.getUrl()}`);
}
bootstrap();
