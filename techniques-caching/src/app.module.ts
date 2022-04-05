import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppControllerWithInterceptor1 } from './app-with-interpector.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyCacheService } from './my-cache.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [AppController, AppControllerWithInterceptor1],
  providers: [
    AppService,
    MyCacheService,
    { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
  ],
})
export class AppModule {}
