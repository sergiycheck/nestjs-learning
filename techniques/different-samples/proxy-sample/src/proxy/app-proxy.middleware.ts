import { ExpressAdapter } from '@nestjs/platform-express';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import { WEB_API_URL } from '../app-defaults';

export const configureProxyForExpressAdapter = (
  expressInstance: ExpressAdapter,
) => {
  const config: Options = {
    target: WEB_API_URL,
    changeOrigin: true,
    logLevel: 'debug',
    pathRewrite: {
      [`^/json_placeholder`]: '',
    },
  };

  expressInstance.use('/json_placeholder', createProxyMiddleware(config));
};
