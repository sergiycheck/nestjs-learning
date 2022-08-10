import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

// in graphQL apps, intercaptors are executed separately for each field resolver. Thus,
// CacheModule (which uses interceptors to cache responses) won't work properly

@Injectable()
export class MyCacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async setCacheKey(key: string, data: string) {
    const res = await this.cacheManager.set(key, data);
    return res;
  }

  async getCacheKey(key: string) {
    const res = await this.cacheManager.get(key);
    return res;
  }

  //The default expiration time of the cache is 5 seconds.
  async setCacheKeyWithTtl(key: string, data: string, ttl: number) {
    const res = await this.cacheManager.set(key, data, { ttl });
    return res;
  }

  async setCacheKeyWithDisabledTtl(key: string, data: string) {
    const res = await this.cacheManager.set(key, data, { ttl: 0 });
    return res;
  }

  async removeItemFromCache(key: string) {
    const res = await this.cacheManager.del(key);
    return res;
  }

  async resetCache() {
    const res = await this.cacheManager.reset();
    return res;
  }
}
