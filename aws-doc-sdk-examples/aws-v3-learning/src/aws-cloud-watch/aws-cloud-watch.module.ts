import { AwsCloudWatchSendScheduledRulesController } from './aws-scheduled-rule.controller';
import { AwsCloudWatchEventsService } from './aws-cloud-watch-events.service';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AwsCloudWatchController } from './aws-cloud-watch.controller';
import { AwsCloudWatchService } from './aws-cloud-watch.service';

@Module({
  imports: [ConfigModule],
  controllers: [AwsCloudWatchController, AwsCloudWatchSendScheduledRulesController],
  providers: [AwsCloudWatchService, AwsCloudWatchEventsService],
})
export class AwsCloudWatchModule {}
