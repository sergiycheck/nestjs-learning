import {
  Body,
  CacheInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { MyCacheService } from './my-cache.service';

//only GET endpoint are cached. Also, HTTP server routes that inject the native response object
// @Res()

@Controller('cache-data')
@UseInterceptors(CacheInterceptor)
export class AppControllerWithInterceptor1 {
  constructor(
    private readonly appService: AppService,
    private readonly myCacheService: MyCacheService,
  ) {}

  @Get('find-all')
  findAll(): string[] {
    return [];
  }

  @Get('get-data-from-cache/:key')
  getDataFromCache(@Param('key') key) {
    return this.myCacheService.getCacheKey(key);
  }

  @Post('set-data-to-cache-for-key/:key')
  setDataToCacheForKey(@Param('key') key, @Body() obj: { data: string }) {
    return this.myCacheService.setCacheKey(key, obj.data);
  }
}
