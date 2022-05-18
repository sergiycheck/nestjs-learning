import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeatureOneModule } from './feature-one/feature-one.module';
import { FeatureTwoPartialConfRegModule } from './feature-two-partial-conf-reg/feature-two-partial-conf-reg.module';

console.log('default app module');

@Module({
  // load and prase a .env file from the project root dir, merge key/value pairs from
  // the .env file with environment variables assigned to process.env
  //and store the results in a private structure that you can access through the ConfigService
  imports: [
    ConfigModule.forRoot({
      //increase the performance of ConfigService#get method when it comes to variables stored in
      // process.env
      cache: true,
      expandVariables: true,
    }),
    FeatureOneModule,
    FeatureTwoPartialConfRegModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
