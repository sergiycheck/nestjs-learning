import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeatureOneModule } from './feature-one/feature-one.module';

console.log('default app module');

@Module({
  // load and prase a .env file from the project root dir, merge key/value pairs from
  // the .env file with environment variables assigned to process.env
  //and store the results in a private structure that you can access through the ConfigService
  imports: [ConfigModule.forRoot({}), FeatureOneModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
