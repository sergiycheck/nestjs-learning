import { CatsModule } from './../cats/cats.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [CatsModule],
})
export class AppProxyModule {}
