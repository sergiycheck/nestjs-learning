import { ValidationPipe, INestApplication, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './root-module/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
//configuring dotenv breaks multer. Multer does not work with configured dotenv
// import * as dotenv from 'dotenv';
// dotenv.config();
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import * as session from 'express-session';
import { randomUUID } from 'crypto';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await configureGlobalMiddelware(app);
  configureSequelizeOnModelChange(app);
  configureSwagger(app);

  await app.listen(3000);
  console.log(`App is running on ${await app.getUrl()}`);
}
bootstrap();

export async function configureGlobalMiddelware(app: INestApplication) {
  app.useGlobalPipes(new ValidationPipe());
  app.use(cors());

  app.enableVersioning({
    type: VersioningType.URI,

    defaultVersion: '1',
    // or
    // defaultVersion: ['1', '2']
    // or
    // defaultVersion: VERSION_NEUTRAL
  });
  app.use(cookieParser());
  app.use(compression());

  if (process.env.NODE_ENV === 'development') {
    //only for debugging!
    const secretUUID = randomUUID();
    app.use(
      session({
        secret: secretUUID,
        resave: false,
        saveUninitialized: false,
      }),
    );
  }
}

export function configureSequelizeOnModelChange(app: INestApplication) {
  // run on model change
  // const sequelize = app.get(Sequelize);
  // await sequelize.sync({ force: true });
}

export function configureSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('nestjs techniques trying')
    .setVersion('1.0')
    .build();
  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, doc);
}
