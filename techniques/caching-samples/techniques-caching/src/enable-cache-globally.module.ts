import { CacheModule, Module } from '@nestjs/common';

//when you want to use CacheModule in other modules, you'll need to import it (as it standart with any nest module)
//. Alternatively, declare it as a global module by setting the optioins object's isGlobal property to true, as shown below.
// In that case, you won't need to import CacheModule in other modules once it's been loaded in the root module
@Module({
  imports: [CacheModule.register({ isGlobal: true })],
})
export class EnableCacheGloballyModule {}
