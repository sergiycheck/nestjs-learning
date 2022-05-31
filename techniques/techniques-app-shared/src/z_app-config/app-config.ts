import { NestFactory } from '@nestjs/core';
import { AppModule } from '../root-module/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as fs from 'fs';
import { configureGlobalMiddelware } from './config-middleware';
import { configureSequelizeOnModelChange, configureSwagger } from './add-config-and-swagger';
import * as path from 'path';

export async function getAppNestExpressApp(): Promise<NestExpressApplication> {
  const keyPathNorm = path.resolve(process.cwd(), './secrets/web_api/localhost-key.pem');
  const cartPathNorm = path.resolve(process.cwd(), './secrets/web_api/localhost.pem');

  let appApi: NestExpressApplication = null;

  if (fs.existsSync(keyPathNorm) && fs.existsSync(cartPathNorm)) {
    const httpsOptions = {
      key: fs.readFileSync(keyPathNorm),
      cert: fs.readFileSync(cartPathNorm),
    };

    appApi = await NestFactory.create<NestExpressApplication>(AppModule, {
      httpsOptions,
    });
    return appApi;
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
