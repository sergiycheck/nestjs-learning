import { AllExceptionsFromAwsFilter } from './../common/filters/all-exceptions-from-aws.filter';
import { Body, Controller, Get, Param, Put, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { S3ManagerService } from './s3-manager.service';
import { allowedMethodsArr, PutBucketCorsDto } from './dto/s3-cors.dto';
import * as _ from 'lodash';
import {
  CORSRule,
  GetBucketCorsCommand,
  PutBucketCorsCommand,
  PutBucketCorsCommandInput,
} from '@aws-sdk/client-s3';

@ApiTags('S3ManagerCorsController')
@Controller('s3-buckets-cors')
@UseFilters(AllExceptionsFromAwsFilter)
export class S3ManagerCorsController {
  constructor(private s3Manager: S3ManagerService) {}

  @Get('get-bucket-cors/:bucketName')
  async getBucketCors(@Param('bucketName') bucketName: string) {
    const result = await this.s3Manager.S3.send(
      new GetBucketCorsCommand({
        Bucket: bucketName,
      }),
    );
    return {
      result,
    };
  }

  @Put('put-bucket-cors/:bucketName')
  async putBucketCors(
    @Param('bucketName') bucketName: string,
    @Body() putBucketCorsDto: PutBucketCorsDto,
  ) {
    const thisConfig: CORSRule = {
      AllowedHeaders: ['Authorization'],
      AllowedMethods: _.intersection(allowedMethodsArr, putBucketCorsDto.methods).map(
        (item) => item.toLocaleUpperCase(),
      ),
      AllowedOrigins: ['*'],
      ExposeHeaders: [],
      MaxAgeSeconds: 3000,
    };

    const corsParams: PutBucketCorsCommandInput = {
      Bucket: bucketName,
      CORSConfiguration: { CORSRules: new Array(thisConfig) },
    };

    const result = await this.s3Manager.S3.send(new PutBucketCorsCommand(corsParams));

    return {
      result,
    };
  }
}
