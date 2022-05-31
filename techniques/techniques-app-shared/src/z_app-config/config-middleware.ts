import { ValidationPipe, VersioningType } from '@nestjs/common';

import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import * as connectRedis from 'connect-redis';
import { createClient } from 'redis';

export async function configureGlobalMiddelware(app: NestExpressApplication) {
  app.useGlobalPipes(new ValidationPipe());
  app.use(cors());

  app.enableVersioning({
    type: VersioningType.URI,

    defaultVersion: '1',
  });
  app.use(cookieParser());
  app.use(compression());
  configRedisWithSession(app);
}

export function configRedisWithSession(app: NestExpressApplication) {
  const configService = app.get(ConfigService);
  const RedisStore = connectRedis(session);
  const redisClient = createClient({ legacyMode: true, url: 'redis://localhost:6379' });
  redisClient.connect();

  const sess: session.SessionOptions = {
    secret: configService.get('SESSION_KEY'),
    resave: false,
    saveUninitialized: false, //Forces a session that is "uninitialized" to be saved to the store.
    cookie: {},
    store: new RedisStore({ client: redisClient }),
  };

  sess.cookie.secure = true;
  app.enable('trust proxy');

  app.use(session(sess));
}
