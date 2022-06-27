import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

//configuring dotenv breaks multer. Multer does not work with configured dotenv
// import * as dotenv from 'dotenv';
// dotenv.config();

import { NestExpressApplication } from '@nestjs/platform-express';
import { AppProxyModule } from './proxy/app-proxy.module';
import {
  configureAndListenApiServer,
  configureAndListenProxyServer,
  getAppNestExpressApp,
} from './z_app-config/app-config';

async function bootstrap() {
  const appApi = await getAppNestExpressApp();
  const appApiProxy = await NestFactory.create<NestExpressApplication>(AppProxyModule);

  const configService = appApi.get(ConfigService);
  const PROXY_PORT = +configService.get('PROXY_PORT');
  const PORT = +configService.get('PORT');

  configureAndListenProxyServer(appApiProxy, PROXY_PORT);
  configureAndListenApiServer(appApi, PORT);
}
bootstrap();
