import { PutBucketAclDto } from './dto/putBucketACL.dto';
import { AllExceptionsFromAwsFilter } from './../common/filters/all-exceptions-from-aws.filter';
import { Body, Controller, Delete, Get, Param, Put, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { S3ManagerService } from './s3-manager.service';
import { randomUUID } from 'crypto';

@ApiTags('S3ManagerPoliciesController')
@Controller('s3-buckets-policies')
@UseFilters(AllExceptionsFromAwsFilter)
export class S3ManagerPoliciesController {
  constructor(private s3Manager: S3ManagerService) {}

  @Get('get-bucket-policy/:bucketName')
  async getBucketPolicy(@Param('bucketName') bucketName: string) {
    const result = await this.s3Manager.S3.getBucketPolicy({
      Bucket: bucketName,
    }).promise();

    return {
      result: {
        Policy: JSON.parse(result.Policy),
      },
    };
  }

  //https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html
  //https://docs.aws.amazon.com/AmazonS3/latest/userguide/example-bucket-policies.html#example-bucket-policies-use-case-1
  //https://awspolicygen.s3.amazonaws.com/policygen.html
  @Put('put-bucket-policy/add-readonly-permission-obj/:bucketName')
  async putBucketPolicy(@Param('bucketName') bucketName: string) {
    const readOnlyAnyUserPolicy = {
      Version: '2012-10-17',
      Statement: [
        {
          Sid: `Stmt-${randomUUID()}`,
          Action: ['s3:GetObject'],
          Effect: 'Allow',
          Resource: `arn:aws:s3:::${bucketName}/*`,
          Principal: {
            AWS: '*',
          },
        },
      ],
    };

    const params: AWS.S3.PutBucketPolicyRequest = {
      Bucket: bucketName,
      Policy: JSON.stringify(readOnlyAnyUserPolicy),
    };

    const result = await this.s3Manager.S3.putBucketPolicy(params).promise();

    return {
      result,
    };
  }

  @Delete('delete-bucket-policy/:bucketName')
  async deleteBucketPolicy(@Param('bucketName') bucketName: string) {
    const result = await this.s3Manager.S3.deleteBucketPolicy({
      Bucket: bucketName,
    }).promise();

    return {
      result,
    };
  }
}
