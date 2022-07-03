import { PutMetricsDto, DeleteAlarmDto } from './dtos/dtos.dto';
import { AwsCloudWatchService } from './aws-cloud-watch.service';
import { AllExceptionsFromAwsFilter } from './../common/filters/all-exceptions-from-aws.filter';
import { Body, Controller, Delete, Get, Put, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  DeleteAlarmsCommand,
  DescribeAlarmsCommand,
  PutMetricAlarmCommand,
  PutMetricAlarmCommandInput,
} from '@aws-sdk/client-cloudwatch';

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

  @Put('put-metric-alarm')
  async putMetricsAlarm(@Body() putMetricsDto: PutMetricsDto) {
    const params: PutMetricAlarmCommandInput = {
      ...putMetricsDto,
      ComparisonOperator: 'GreaterThanThreshold',
      EvaluationPeriods: 1,
      MetricName: 'CPUUtilization',
      Namespace: 'AWS/EC2',
      Period: 60,
      Statistic: 'Average',
      Threshold: 70.0,
      ActionsEnabled: false,
      Dimensions: [
        {
          Name: 'InstanceId',
          Value: 'INSTANCE_ID',
        },
      ],
      Unit: 'Percent',
    };

    const result = await this.cloudWatchService.cloudWatchClient.send(
      new PutMetricAlarmCommand(params),
    );

    return result;
  }

  @Delete('delete-alarm')
  async deleteAlarm(@Body() deleteDto: DeleteAlarmDto) {
    return await this.cloudWatchService.cloudWatchClient.send(
      new DeleteAlarmsCommand({ ...deleteDto }),
    );
  }
}
