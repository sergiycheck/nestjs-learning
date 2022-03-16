import { Global, Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

//provide a set of providers which should be available
//everywhere out-of-the-box (helpers, db connections)
//make the module global with the @Global() decorator
@Global()
//modules are singletons
@Module({
  // imports: [DatabaseModule.forRoot([Cat])]
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
