import {
  CacheInterceptor,
  CACHE_MANAGER,
  CACHE_TTL_METADATA,
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Cache } from 'cache-manager';
import { Request } from 'express';
import { Observable, of, tap } from 'rxjs';
import { isNil, isFunction } from '@nestjs/common/utils/shared.utils';

@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
  constructor(@Inject(CACHE_MANAGER) cacheManger: Cache, reflector: Reflector) {
    super(cacheManger, reflector);
  }

  trackBy(context: ExecutionContext): string | undefined {
    const requestedUrl = super.trackBy(context);

    return requestedUrl;
  }

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    //if request is not cacheable the cacheKey will be undefined
    const cacheKey = this.trackBy(context);
    if (!cacheKey) return Promise.resolve(next.handle());

    const ttlValueOfFactory =
      this.reflector.get(CACHE_TTL_METADATA, context.getHandler()) ?? null;

    try {
      const cachedData = await this.cacheManager.get(cacheKey);
      if (!isNil(cachedData)) {
        return Promise.resolve(of(cachedData));
      }

      const ttl = isFunction(ttlValueOfFactory)
        ? await ttlValueOfFactory(context)
        : ttlValueOfFactory;

      return Promise.resolve(
        next.handle().pipe(
          tap((data) => {
            //setting overwritten ttl or default
            const argsForRedisSet = isNil(ttl)
              ? [cacheKey, data]
              : [cacheKey, data, { ttl }];
            this.cacheManager.set(...argsForRedisSet);
            return data;
          }),
        ),
      );
    } catch {
      return next.handle();
    }
  }
}
