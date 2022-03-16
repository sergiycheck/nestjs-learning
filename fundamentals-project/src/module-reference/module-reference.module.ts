import { Module } from '@nestjs/common';
import {
  // CatsService,
  // CatsService2,
  // CatsServiceUniqueContextId,
  // OtherService,
  // OtherService1,
  CatsRepository,
  CatsServiceInjectableRequest,
} from './cats.service';
import { CatsServiceDynamicallyInjectable } from './instantiating-custom-classes-dynamically.service';

@Module({
  providers: [
    // CatsService,
    // OtherService,
    // CatsService2,
    // OtherService1,
    // CatsServiceUniqueContextId,
    CatsServiceInjectableRequest,
    CatsRepository,
    CatsServiceDynamicallyInjectable,
  ],
})
export class ModuleReferenceModule {}
