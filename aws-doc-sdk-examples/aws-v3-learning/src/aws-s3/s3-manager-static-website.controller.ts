import { PubBucketWebsiteDto } from './dto/dtos.dto';
import { AllExceptionsFromAwsFilter } from './../common/filters/all-exceptions-from-aws.filter';
import { Body, Controller, Get, Param, Put, UseFilters, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { S3ManagerService } from './s3-manager.service';
import {
  DeleteBucketWebsiteCommand,
  GetBucketWebsiteCommand,
  PutBucketWebsiteCommand,
  PutBucketWebsiteRequest,
} from '@aws-sdk/client-s3';

@ApiTags('S3ManagerStaticWebsiteController')
@Controller('s3-bucket-static-website')
@UseFilters(AllExceptionsFromAwsFilter)
export class S3ManagerStaticWebsiteController {
  constructor(private s3Manager: S3ManagerService) {}

  @Get('by-bucket/:bucketName')
  async getBucketWebsite(@Param('bucketName') bucketName: string) {
    const result = await this.s3Manager.S3.send(
      new GetBucketWebsiteCommand({
        Bucket: bucketName,
      }),
    );
    return {
      result,
    };
  }

  @Put('put-bucket-static-website/:bucketName')
  async putBucketStaticWebsite(
    @Param('bucketName') bucketName: string,
    @Body() putBucketWebsiteDto: PubBucketWebsiteDto,
  ) {
    const params: PutBucketWebsiteRequest = {
      Bucket: bucketName,
      WebsiteConfiguration: {
        ErrorDocument: {
          Key: putBucketWebsiteDto.errorDocumentKey,
        },
        IndexDocument: {
          Suffix: putBucketWebsiteDto.indexDocumentSuffix,
        },
      },
    };

    const result = await this.s3Manager.S3.send(new PutBucketWebsiteCommand(params));

    return {
      result,
    };
  }

  @Delete('delete-bucket-static-website-config/:bucketName')
  async deleteBucketWebsiteConfig(@Param('bucketName') bucketName: string) {
    const result = await this.s3Manager.S3.send(
      new DeleteBucketWebsiteCommand({
        Bucket: bucketName,
      }),
    );

    return {
      result,
    };
  }
}
