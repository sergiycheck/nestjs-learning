import { NestFactory } from '@nestjs/core';
import { AppProxyModule } from './proxy/app-proxy.module';
import { PORT } from './app-defaults';
import {
  NestExpressApplication,
  ExpressAdapter,
} from '@nestjs/platform-express';
import * as morgan from 'morgan';
import { HttpAdapterHost } from '@nestjs/core';
import { configureProxyForExpressAdapter } from './proxy/app-proxy.middleware';
import { globalMiddlewareAuth } from './proxy/auth.middleware';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppProxyModule);
  configureGlobalMiddelware(app);
  await app.listen(PORT);
  console.log(`Proxy app is running on ${await app.getUrl()}`);
}
bootstrap();

export async function configureGlobalMiddelware(app: NestExpressApplication) {
  app.use(morgan('dev'));
  const httpAdapterHost = app.get(HttpAdapterHost);
  const expressInstance =
    httpAdapterHost.httpAdapter.getInstance() as ExpressAdapter;
  expressInstance.post('*', globalMiddlewareAuth);

  configureProxyForExpressAdapter(expressInstance);
}
