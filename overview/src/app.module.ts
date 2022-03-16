import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import {
  // LoggerMiddleware,
  logger,
} from './middlewares/logger.middleware';
import { CatsController } from './cats/cats.controller';

import { APP_FILTER, APP_PIPE, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { RolesGuard } from './guards/roles.guard';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

@Module({
  //the list of imported mofules that export the providers
  //which are required in this module
  imports: [CatsModule],

  //the set of controllers defined in this module which have to be instantiated
  controllers: [AppController],

  //the providers that will be instantiated by the nest injector
  //and that may be shared at least across thie module
  providers: [
    //register a global-scoped filter directly from any module using the
    //following construction
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    AppService,
  ],

  //the subset of providers that are provided by this module
  //and should be available in other modules which
  //import this module. You can use either the provider itself or just
  //its token (provide value)
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(logger)

      .exclude({ path: 'cats/get-library-specific', method: RequestMethod.GET })

      // applied to all routes
      // consumer.apply(LoggerMiddleware).forRoutes('cats');

      //applied only to get routes
      // .forRoutes({ path: 'cats', method: RequestMethod.GET });

      //applid to specific controllers
      .forRoutes(CatsController);
  }
}
