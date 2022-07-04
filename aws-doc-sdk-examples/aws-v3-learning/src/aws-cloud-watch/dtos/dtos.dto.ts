import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
// import { PickType } from '@nestjs/mapped-types';

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
