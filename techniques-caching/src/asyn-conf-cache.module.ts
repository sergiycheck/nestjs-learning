import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (ConfigService: ConfigService) => ({
        ttl: ConfigService.get('CACHE_TTL'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
