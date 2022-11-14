import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AwsSnsService } from './aws-sns.service';
import { AwsSnsController } from './aws-sns.controller';

@Module({
  imports: [ConfigModule],
  controllers: [AwsSnsController],
  providers: [AwsSnsService],
})
export class AwsSnsModule {}
