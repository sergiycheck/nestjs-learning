import { Module, DynamicModule } from '@nestjs/common';

@Module({ providers: [] })
export class DatabaseModule {
  // forRoot() method may return a dynamic module either
  //sychronously or asynchronously ( via a Promise )
  static forRoot(entities = [], options?): DynamicModule {
    //providers
    //
    return {
      //making everything global is not a good design decision
      //register module in the global scope
      global: true,
      module: DatabaseModule,
    };
  }
}
