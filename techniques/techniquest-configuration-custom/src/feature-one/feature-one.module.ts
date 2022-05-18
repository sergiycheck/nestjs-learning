import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FeatureOneService } from './feature-one.service';

@Module({
  imports: [ConfigModule],
  providers: [FeatureOneService],
})
export class FeatureOneModule {}
