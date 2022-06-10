import { Controller, Param, Put, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AllExceptionsFromAwsFilter } from '../common/filters/all-exceptions-from-aws.filter';
import { CloudFormationService } from './cloudFormation.service';

@ApiTags('DescribeStackResourcesController')
@Controller('describe-stack-resources')
@UseFilters(AllExceptionsFromAwsFilter)
export class DescribeStackResourcesController {
  constructor(private cloudFormationService: CloudFormationService) {}

  @Put('describe-stack/:stackName')
  describeStack(@Param('stackName') stackName: string) {
    return this.cloudFormationService.describeStack(stackName);
  }
}
