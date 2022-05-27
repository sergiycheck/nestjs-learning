import { PutBucketAclDto } from './dto/putBucketACL.dto';
import { AllExceptionsFromAwsFilter } from './../common/filters/all-exceptions-from-aws.filter';
import { Body, Controller, Get, Param, Put, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { S3ManagerService } from './s3-manager.service';

@ApiTags('S3ManagerAclController')
@Controller('s3-buckets-acl')
@UseFilters(AllExceptionsFromAwsFilter)
export class S3ManagerAclController {
  constructor(private s3Manager: S3ManagerService) {}

  @Get('get-bucket-access-control-list/:bucketName')
  async getBucketACL(@Param('bucketName') bucketName: string) {
    const result = await this.s3Manager.S3.getBucketAcl({
      Bucket: bucketName,
    }).promise();
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
    const params: AWS.S3.PutBucketAclRequest = {
      Bucket: bucketName,
      ...putBucketAclDto,
    };

    const result = await this.s3Manager.S3.putBucketAcl(params).promise();

    return {
      result,
    };
  }
}
