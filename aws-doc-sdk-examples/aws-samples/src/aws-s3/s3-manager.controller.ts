import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { ApiTags, ApiConsumes } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { FileInterceptor } from '@nestjs/platform-express';
import { randomUUID } from 'crypto';

@Injectable()
export class S3ManagerService {
  private AWS_REGION: string;
  private IAM_USER_KEY_ID: string;
  private IAM_USER_SECRET_ACCESS_KEY: string;
  private _S3: AWS.S3;

  constructor(private configService: ConfigService) {
    this.AWS_REGION = this.configService.get('AWS_REGION');
    this.IAM_USER_KEY_ID = this.configService.get('IAM_USER_KEY_ID');
    this.IAM_USER_SECRET_ACCESS_KEY = this.configService.get(
      'IAM_USER_SECRET_ACCESS_KEY',
    );

    this._S3 = new AWS.S3({
      region: this.AWS_REGION,
      accessKeyId: this.IAM_USER_KEY_ID,
      secretAccessKey: this.IAM_USER_SECRET_ACCESS_KEY,
    });
  }

  get S3() {
    return this._S3;
  }
}

export const appendRandomIdWithHyphenToText = (text: string) => `${randomUUID()}-${text}`;

export class CreateBucketDto {
  @IsNotEmpty()
  name: string;
}

export class FileInfo {
  @IsNotEmpty()
  bucketName: string;
}

@ApiTags('S3ManagerController')
@Controller('s3-buckets')
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
