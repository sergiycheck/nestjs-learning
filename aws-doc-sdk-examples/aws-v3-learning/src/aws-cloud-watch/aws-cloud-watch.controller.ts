import { AwsCloudWatchService } from './aws-cloud-watch.service';
import { AllExceptionsFromAwsFilter } from './../common/filters/all-exceptions-from-aws.filter';
import { Controller, Get, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DescribeAlarmsCommand } from '@aws-sdk/client-cloudwatch';

@ApiTags('AwsCloudWatchController')
@Controller('aws-cloud-watch')
@UseFilters(AllExceptionsFromAwsFilter)
export class AwsCloudWatchController {
  constructor(private cloudWatchService: AwsCloudWatchService) {}

  @Get('describe-all-alarms')
  async describeAllAlarms() {
    const params = { StateValue: 'INSUFFICIENT_DATA' };
    const result = await this.cloudWatchService.cloudWatchClient.send(
      new DescribeAlarmsCommand(params),
    );

    const data = result.MetricAlarms.reduce((prev, curr) => {
      prev.push(curr);
      return prev;
    }, []);

    return {
      data,
    };
  }
}
