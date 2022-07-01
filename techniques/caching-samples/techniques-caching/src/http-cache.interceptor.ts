import { CacheInterceptor, ExecutionContext, Injectable } from '@nestjs/common';
//set up tracking based on different factors
//TODO: how to use ?
@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
  protected trackBy(context: ExecutionContext): string {
    return 'key';
  }
}
