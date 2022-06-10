import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { DescribeStackResourcesController } from './describe-stack-resources.controller';
import { CloudFormationService } from './cloudFormation.service';

@Module({
  imports: [ConfigModule],
  controllers: [DescribeStackResourcesController],
  providers: [CloudFormationService],
})
export class AwsLambdaModule {}
