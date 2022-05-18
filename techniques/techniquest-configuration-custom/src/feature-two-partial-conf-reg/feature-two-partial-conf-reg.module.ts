import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FeatureTwoPartialConfRegService } from './feature-two-partial-conf-reg.service';
import databaseConfig from 'config/database.config';

@Module({
  //forFeature() method is run during module init and the order of module int is indeterminate
  //you may could not access values from constructor by could in onModuleInit() method
  imports: [ConfigModule.forFeature(databaseConfig)],
  providers: [FeatureTwoPartialConfRegService],
})
export class FeatureTwoPartialConfRegModule {}
