import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeatureOneModule } from './feature-one/feature-one.module';
import { FeatureTwoPartialConfRegModule } from './feature-two-partial-conf-reg/feature-two-partial-conf-reg.module';
import { customValidate } from './custom-validation/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({ validate: customValidate }),
    FeatureOneModule,
    FeatureTwoPartialConfRegModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
