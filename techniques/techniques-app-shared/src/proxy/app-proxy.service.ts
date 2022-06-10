import { ConfigService } from '@nestjs/config';
import { Logger, Injectable } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import { PORT } from '../app-defaults';

@Injectable()
export class AppProxyService {
  private readonly logger = new Logger(AppProxyService.name);

  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly configService: ConfigService,
  ) {
    const expressInstance = this.httpAdapterHost.httpAdapter.getInstance() as ExpressAdapter;

    const config: Options = {
      target: `https://localhost:${PORT}`,
      changeOrigin: true,
      logLevel: 'debug',
      //disable certificate check this.configService.get('NODE_ENV') === 'development' ? false : true
      secure: false,
      xfwd: true,
    };

    expressInstance.all('*', createProxyMiddleware(config));
  }
}
