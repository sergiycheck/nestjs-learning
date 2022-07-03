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
