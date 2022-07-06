import {
  DescribeFilterDto,
  CreateSubscriptionFilterDto,
  DeleteSubscriptionFilter,
} from './dtos/dtos.dto';
import { AwsCloudWatchLogsService } from './aws-cloud-watch-logs.service';
import { Body, Controller, Get, Post, Query, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AllExceptionsFromAwsFilter } from './../common/filters/all-exceptions-from-aws.filter';
import {
  DeleteSubscriptionFilterCommand,
  DescribeSubscriptionFiltersCommand,
  PutSubscriptionFilterCommand,
} from '@aws-sdk/client-cloudwatch-logs';

@ApiTags('AwsCloudWatchLogsController')
@Controller('aws-cloud-watch-logs')
@UseFilters(AllExceptionsFromAwsFilter)
export class AwsCloudWatchLogsController {
  constructor(private cloudWatchService: AwsCloudWatchLogsService) {}

  @Get('describe-filters')
  asyncDescribeFilters(@Query() describeFilterDto: DescribeFilterDto) {
    return this.cloudWatchService.cloudWatchClient.send(
      new DescribeSubscriptionFiltersCommand({ ...describeFilterDto }),
    );
  }

  @Post('create-subscription-filter')
  createSubscriptionFilter(@Body() createSubscFilterDto: CreateSubscriptionFilterDto) {
    return this.cloudWatchService.cloudWatchClient.send(
      new PutSubscriptionFilterCommand(createSubscFilterDto),
    );
  }

  @Post('delete-subscription-filter')
  deleteSubscriptionFilter(@Body() deleteSubscFilterDto: DeleteSubscriptionFilter) {
    return this.cloudWatchService.cloudWatchClient.send(
      new DeleteSubscriptionFilterCommand(deleteSubscFilterDto),
    );
  }
}
