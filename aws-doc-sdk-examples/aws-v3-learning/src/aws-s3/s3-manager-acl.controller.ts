import { PutBucketAclDto } from './dto/putBucketACL.dto';
import { AllExceptionsFromAwsFilter } from './../common/filters/all-exceptions-from-aws.filter';
import { Body, Controller, Get, Param, Put, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { S3ManagerService } from './s3-manager.service';
import {
  GetBucketAclCommand,
  PutBucketAclCommand,
  PutBucketAclRequest,
} from '@aws-sdk/client-s3';

@ApiTags('S3ManagerAclController')
@Controller('s3-buckets-acl')
@UseFilters(AllExceptionsFromAwsFilter)
export class S3ManagerAclController {
  constructor(private s3Manager: S3ManagerService) {}

  @Get('get-bucket-access-control-list/:bucketName')
  async getBucketACL(@Param('bucketName') bucketName: string) {
    const result = await this.s3Manager.S3.send(
      new GetBucketAclCommand({
        Bucket: bucketName,
      }),
    );
    return {
      result,
    };
  }

  //https://docs.aws.amazon.com/AmazonS3/latest/userguide/acl-overview.html#specifying-grantee
  @Put('put-bucket-acl/:bucketName')
  async putBucketAcl(
    @Param('bucketName') bucketName: string,
    @Body() putBucketAclDto: PutBucketAclDto,
  ) {
    const params: PutBucketAclRequest = {
      Bucket: bucketName,
      ...putBucketAclDto,
    };

    const result = await this.s3Manager.S3.send(new PutBucketAclCommand(params));

    return {
      result,
    };
  }
}
