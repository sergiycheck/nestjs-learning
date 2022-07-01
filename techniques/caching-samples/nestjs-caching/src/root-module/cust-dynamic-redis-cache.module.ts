import { CacheModule, Global, Module } from '@nestjs/common';
import type { ClientOpts } from 'redis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import redisStore from 'cache-manager-redis-store';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync<ClientOpts>({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const ttl = configService.get('CACHE_TTL'); //in seconds
        const host = configService.get('REDIS_CACHE_HOST');
        const port = configService.get('REDIS_CACHE_PORT');
        return {
          ttl,
          max: 10,
          store: redisStore,
          host,
          port,
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [CacheModule],
})
export class DynamicRedisCacheModule {}
