import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CircularExampleModule } from './circular-example/cirlucalar-example.module';
import { ModuleReferenceModule } from './module-reference/module-reference.module';
import { CustomLazyModule } from './lazy-loading-modules/custom-lazy.module';
import { ExecutionContextCustomModule } from './execution-context/execution-context-custom.module';
import { MyCustomLifecycleEventsModule } from './my-custom-lifecycle-events/my-custom-lifecycle-events.module';
import { MyCustomTestingApproachModule } from './my-custom-testing-approach/my-custom-testing-approach.module';

@Module({
  imports: [
    CircularExampleModule,
    ModuleReferenceModule,
    CustomLazyModule,
    ExecutionContextCustomModule,
    MyCustomLifecycleEventsModule,
    MyCustomTestingApproachModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
