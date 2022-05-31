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
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { PORT, PROXY_PORT } from './app-defaults';
import { AppProxyModule } from './proxy/app-proxy.module';
import * as fs from 'fs';

async function bootstrap() {
  const appApi = await getAppNestExpressApp();
  const appApiProxy = await NestFactory.create<NestExpressApplication>(AppProxyModule);

  configureAndListenProxyServer(appApiProxy, PROXY_PORT);
  configureAndListenApiServer(appApi, PORT);
}
bootstrap();

export async function getAppNestExpressApp(): Promise<NestExpressApplication> {
  const keyPath = './secrets/web_api/localhost-key.pem';
  const certPath = './secrets/web_api/localhost.pem';
  let appApi: NestExpressApplication = null;
  if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
    const httpsOptions = {
      key: fs.readFileSync('./secrets/web_api/localhost-key.pem'),
      cert: fs.readFileSync('./secrets/web_api/localhost.pem'),
    };

    appApi = await NestFactory.create<NestExpressApplication>(AppModule, {
      httpsOptions,
    });
  }
  appApi = await NestFactory.create<NestExpressApplication>(AppModule);
  return appApi;
}

export async function configureAndListenProxyServer(app: NestExpressApplication, port: number) {
  await app.listen(port);
  console.log(`Proxy app is running on ${await app.getUrl()}`);
}

export async function configureAndListenApiServer(app: NestExpressApplication, port: number) {
  await configureGlobalMiddelware(app);
  configureSequelizeOnModelChange(app);
  configureSwagger(app);
  await app.listen(port);
  console.log(`App is running on ${await app.getUrl()}`);
}

export async function configureGlobalMiddelware(app: NestExpressApplication) {
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
    //only for debugging!\

    const secretUUID = randomUUID();

    const sess: session.SessionOptions = {
      secret: secretUUID,
      resave: false,
      saveUninitialized: false,
      cookie: {},
    };

    const configService = app.get(ConfigService);
    if (configService.get('NODE_ENV') === 'development') {
      sess.cookie.secure = true;
      app.enable('trust proxy');
    }

    app.use(session(sess));
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
