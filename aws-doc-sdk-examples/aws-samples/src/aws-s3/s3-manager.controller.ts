import { AllExceptionsFromAwsFilter } from './../common/filters/all-exceptions-from-aws.filter';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateBucketDto, FileInfo } from './dto/dtos.dto';
import { S3ManagerService } from './s3-manager.service';
import { appendRandomIdWithHyphenToText } from '../utils/utils';

@ApiTags('S3ManagerController')
@Controller('s3-buckets')
@UseFilters(AllExceptionsFromAwsFilter)
export class S3ManagerController {
  constructor(private s3Manager: S3ManagerService) {}

  @Get('list-buckets')
  async listBuckets() {
    const result = await this.s3Manager.S3.listBuckets().promise();

    return { buckets: result.Buckets, owner: result.Owner };
  }

  @Post('create-bucket')
  async create(@Body() createBucketDto: CreateBucketDto) {
    console.log(createBucketDto);
    const result = await this.s3Manager.S3.createBucket({
      Bucket: createBucketDto.name,
    }).promise();

    return {
      result,
    };
  }

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  async uploadFile(
    @Body() fileInfo: FileInfo,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const uploadParams = {
      Bucket: fileInfo.bucketName,
      Key: appendRandomIdWithHyphenToText(file.originalname),
      Body: file.buffer,
    };

    const result = await this.s3Manager.S3.upload(uploadParams).promise();

    return {
      result,
    };
  }

  @Get('list-objects/:bucketName')
  async listObjectInBucket(@Param('bucketName') bucketName: string) {
    const result = await this.s3Manager.S3.listObjects({ Bucket: bucketName }).promise();
    return {
      result,
    };
  }

  @Delete('delete-bucket/:bucketName')
  async deleteBucket(@Param('bucketName') bucketName: string) {
    const result = await this.s3Manager.S3.deleteBucket({ Bucket: bucketName }).promise();
    return {
      result,
    };
  }

  @Delete('delete-all-in-bucket/:bucketName')
  async deleteAllInBucket(@Param('bucketName') bucketName: string) {
    const objects = await this.s3Manager.S3.listObjects({ Bucket: bucketName }).promise();

    const params: AWS.S3.DeleteObjectsRequest = {
      Bucket: bucketName,
      Delete: {
        Objects: objects.Contents.map((obj) => ({ Key: obj.Key })),
        Quiet: false,
      },
    };

    const result = await this.s3Manager.S3.deleteObjects(params).promise();

    return {
      result,
    };
  }
}
