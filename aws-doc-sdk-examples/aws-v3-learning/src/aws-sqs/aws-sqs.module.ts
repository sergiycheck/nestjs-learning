import { Module } from '@nestjs/common';
import { AwsSqsService } from './aws-sqs.service';
import { AwsSqsController } from './aws-sqs.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [AwsSqsController],
  providers: [AwsSqsService],
})
export class AwsSqsModule {}
