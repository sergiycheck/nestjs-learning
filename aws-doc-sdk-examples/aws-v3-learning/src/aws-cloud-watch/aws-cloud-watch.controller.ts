import { PutMetricsDto, DeleteAlarmDto, ListMetricsDto } from './dtos/dtos.dto';
import { AwsCloudWatchService } from './aws-cloud-watch.service';
import { AllExceptionsFromAwsFilter } from './../common/filters/all-exceptions-from-aws.filter';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseFilters,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  DeleteAlarmsCommand,
  DescribeAlarmsCommand,
  DisableAlarmActionsCommand,
  EnableAlarmActionsCommand,
  EnableAlarmActionsCommandInput,
  ListMetricsCommand,
  ListMetricsInput,
  PutMetricAlarmCommand,
  PutMetricAlarmCommandInput,
  PutMetricDataCommand,
  PutMetricDataCommandInput,
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

  @Put('put-enable-metric-alarm')
  async putEnableMetricsAlarm(@Body() putMetricsDto: PutMetricsDto) {
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
      AlarmActions: ['ACTION_ARN'], //e.g., "arn:aws:automate:us-east-1:ec2:stop"
      Dimensions: [
        {
          Name: 'InstanceId',
          Value: 'INSTANCE_ID',
        },
      ],
      Unit: 'Percent',
    };

    const result: any = {};
    const resultPutMetrics = await this.cloudWatchService.cloudWatchClient.send(
      new PutMetricAlarmCommand(params),
    );

    result.resultPutMetrics = resultPutMetrics;

    const paramsEnableAlarmAction: EnableAlarmActionsCommandInput = {
      AlarmNames: [params.AlarmName],
    };

    const enableMetricsResult = await this.cloudWatchService.cloudWatchClient.send(
      new EnableAlarmActionsCommand(paramsEnableAlarmAction),
    );

    result.enableMetricsResult = enableMetricsResult;

    return result;
  }

  @Post('disable-alarm')
  async disabeAlarmCommand(@Body() deleteDto: DeleteAlarmDto) {
    return await this.cloudWatchService.cloudWatchClient.send(
      new DisableAlarmActionsCommand({ ...deleteDto }),
    );
  }

  @Get('list-metrics')
  async listMetrics(@Query() listMetricsDto: ListMetricsDto) {
    const params: ListMetricsInput = {
      Dimensions: [
        {
          Name: listMetricsDto.Dimensions_Name,
        },
      ],
      MetricName: listMetricsDto.MetricName,
      Namespace: 'AWS/Logs',
    };

    return await this.cloudWatchService.cloudWatchClient.send(
      new ListMetricsCommand(params),
    );
  }

  @Put('put-metrics-data')
  async putMetricsData() {
    const params: PutMetricDataCommandInput = {
      MetricData: [
        {
          MetricName: 'PAGES_VISITED',
          Dimensions: [
            {
              Name: 'UNIQUE_PAGES',
              Value: 'URLS',
            },
          ],
          Unit: 'None',
          Value: 1.0,
        },
      ],
      Namespace: 'SITE/TRAFFIC',
    };

    return await this.cloudWatchService.cloudWatchClient.send(
      new PutMetricDataCommand(params),
    );
  }
}
