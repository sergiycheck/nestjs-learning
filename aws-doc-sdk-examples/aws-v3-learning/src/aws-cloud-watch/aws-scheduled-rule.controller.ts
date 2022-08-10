import { AwsCloudWatchEventsService } from './aws-cloud-watch-events.service';
import { PutRuleDto, PutTargetParamsDto } from './dtos/dtos.dto';
import { AllExceptionsFromAwsFilter } from './../common/filters/all-exceptions-from-aws.filter';
import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Put, UseFilters } from '@nestjs/common';
import {
  PutEventsCommand,
  PutEventsCommandInput,
  PutRuleCommand,
  PutTargetsCommand,
  PutTargetsCommandInput,
} from '@aws-sdk/client-cloudwatch-events';

@ApiTags('AwsCloudWatchSendScheduledRulesController')
@Controller('aws-cloud-watch-send-scheduled-rules')
@UseFilters(AllExceptionsFromAwsFilter)
export class AwsCloudWatchSendScheduledRulesController {
  constructor(private cweClientService: AwsCloudWatchEventsService) {}

  @Put('put-rule-command')
  async putRuleCommand(@Body() putRoleDto: PutRuleDto) {
    const params = {
      ...putRoleDto,
    };
    const data = await this.cweClientService.cwceClient.send(new PutRuleCommand(params));
    return data;
  }

  @Put('set-target-for-scheduled-rule')
  async addLambdaFunctionTarget(@Body() putTargetDto: PutTargetParamsDto) {
    const params: PutTargetsCommandInput = {
      Rule: putTargetDto.Rule,
      Targets: [
        {
          Arn: putTargetDto.Targets_Function_Arn, //LAMBDA_FUNCTION_ARN
          Id: putTargetDto.Targets_Id,
        },
      ],
    };

    return await this.cweClientService.cwceClient.send(new PutTargetsCommand(params));
  }

  @Put('put-events')
  async sendingEvents() {
    // TODO: can not understand what's the arn of Resources
    // for custom event, and how to see it logged
    const params: PutEventsCommandInput = {
      Entries: [
        {
          Detail: '{ "key1": "value1", "key2": "value2" }',
          DetailType: 'appRequestSubmitted',
          Resources: [
            'RESOURCE_ARN', //RESOURCE_ARN
          ],
          Source: 'com.company.app',
        },
      ],
    };

    return await this.cweClientService.cwceClient.send(new PutEventsCommand(params));
  }
}
