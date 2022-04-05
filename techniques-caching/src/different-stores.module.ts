import { CacheModule, Module } from '@nestjs/common';
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      store: redisStore,

      // Store-specific conf

      socket: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
})
export class DifferentStoresModule {}
