import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AwsCloudWatchController } from './aws-cloud-watch.controller';
import { AwsCloudWatchService } from './aws-cloud-watch.service';

@Module({
  imports: [ConfigModule],
  controllers: [AwsCloudWatchController],
  providers: [AwsCloudWatchService],
})
export class AwsCloudWatchModule {}
