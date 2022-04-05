import { CacheKey, CacheTTL, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //global cache is enabled, cache entries are stored under a CacheKey that is auto-gen
  // based on the route path. You may override certain cache settings (@CacheKey() and @CacheTTL())
  // on a per-method basis. relevant using different cache stores

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @CacheKey('custom_key1')
  @CacheTTL(20)
  @Get('find-all')
  findAll(): string[] {
    return [];
  }
}
