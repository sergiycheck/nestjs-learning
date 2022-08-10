import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { PickType } from '@nestjs/mapped-types';

export class PutMetricsDto {
  @IsNotEmpty()
  @IsString()
  AlarmName = 'Web_Server_CPU_Utilization';
  @IsNotEmpty()
  @IsString()
  AlarmDescription = 'Alarm when server CPU exceeds 70%';
}

export class DeleteAlarmDto {
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  AlarmNames = ['Web_Server_CPU_Utilization'];
}

export class ListMetricsDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ name: 'Dimensions_Name', type: String })
  Dimensions_Name = 'LogGroupName';

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ name: 'MetricName', type: String })
  MetricName = 'IncomingLogEvents';
}

export class PutRuleDto {
  @IsNotEmpty()
  @IsString()
  Name = 'DEMO_EVENT';

  @IsNotEmpty()
  @IsString()
  RoleArn =
    'arn:aws:iam::581425740433:role/role-for-access-cloudwatch-events-from-lambda';

  @IsNotEmpty()
  @IsString()
  ScheduleExpression = 'rate(5 minutes)';

  @IsNotEmpty()
  @IsString()
  State = 'ENABLED';
}

export class PutTargetParamsDto {
  @IsNotEmpty()
  @IsString()
  Rule = 'DEMO_EVENT';

  @IsNotEmpty()
  @IsString()
  Targets_Function_Arn = `arn:aws:lambda:eu-central-1:581425740433:function:aws-cloudWatch-ec2-log-lambda-dev-hello`;

  @IsNotEmpty()
  @IsString()
  Targets_Id = 'myCloudWatchEventsTarget';
}

export class DescribeFilterDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ name: 'logGroupName', type: String })
  logGroupName = '/aws/lambda/sub-filt-lambda-identical-dev-hello/another';

  @IsNotEmpty()
  @IsInt()
  limit = 5;
}

export class CreateSubscriptionFilterDto {
  @IsNotEmpty()
  @IsString()
  destinationArn =
    'arn:aws:lambda:eu-central-1:581425740433:function:sub-filt-lambda-identical-dev-hello';

  @IsNotEmpty()
  @IsString()
  filterName = 'filter-for-lambda-2';

  @IsNotEmpty()
  @IsString()
  filterPattern = 'ERROR';

  @IsNotEmpty()
  @IsString()
  logGroupName = '/aws/lambda/sub-filt-lambda-identical-dev-hello/another';
}

export class DeleteSubscriptionFilter extends PickType(CreateSubscriptionFilterDto, [
  'filterName',
  'logGroupName',
] as const) {
  @IsNotEmpty()
  @IsString()
  filterName = 'filter-for-lambda-2';

  @IsNotEmpty()
  @IsString()
  logGroupName = '/aws/lambda/sub-filt-lambda-identical-dev-hello/another';
}
