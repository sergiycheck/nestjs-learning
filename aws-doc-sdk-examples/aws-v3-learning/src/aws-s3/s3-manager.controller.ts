import { AllExceptionsFromAwsFilter } from './../common/filters/all-exceptions-from-aws.filter';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateBucketDto, FileInfo, FileUploadDto } from './dto/dtos.dto';
import { S3ManagerService } from './s3-manager.service';
import { appendRandomIdWithHyphenToText } from '../utils/utils';
import {
  CreateBucketCommand,
  DeleteBucketCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
  DeleteObjectsCommandInput,
  GetObjectCommand,
  ListBucketsCommand,
  ListObjectsCommand,
  ListObjectsCommandInput,
  PutObjectCommand,
  _Object,
} from '@aws-sdk/client-s3';
import { Stream } from 'stream';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { fetch } from 'undici';

@ApiTags('S3ManagerController')
@Controller('s3-buckets-sdk-v3')
@UseFilters(AllExceptionsFromAwsFilter)
export class S3ManagerController {
  constructor(private s3Manager: S3ManagerService) {}

  @Get('list-buckets')
  async listBuckets() {
    const result = await this.s3Manager.S3.send(new ListBucketsCommand({}));

    return { buckets: result.Buckets, owner: result.Owner };
  }

  @Post('create-bucket')
  async create(@Body() createBucketDto: CreateBucketDto) {
    const result = await this.s3Manager.S3.send(
      new CreateBucketCommand({
        Bucket: createBucketDto.name,
      }),
    );

    return {
      result,
    };
  }
  //https://github.com/expressjs/multer#file-information
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  @ApiBody({
    description: 'upload a file to a bucket',
    type: FileUploadDto,
  })
  async uploadFile(
    @Body() fileInfo: FileInfo,
    @UploadedFile() file: Express.Multer.File, //only text files
  ) {
    const uploadCommand = new PutObjectCommand({
      Bucket: fileInfo.bucketName,
      Key: fileInfo?.appendRadomIdAsAFileKey
        ? appendRandomIdWithHyphenToText(file.originalname)
        : file.originalname,
      Body: file.buffer,
      // ContentType: 'text/html; charset=UTF-8',
    });

    const result = await this.s3Manager.S3.send(uploadCommand);

    return {
      result,
    };
  }

  // https://www.npmjs.com/package/@aws-sdk/s3-request-presigner
  //https://developer.mozilla.org/en-US/docs/Web/API/Blob
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload-with-signed-url')
  @ApiBody({
    description: 'upload a file to a bucket with signed url',
    type: FileUploadDto,
  })
  async uploadFileWithSignedUrl(
    @Body() fileInfo: FileInfo,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const bodyToUpload = file.buffer;
    const bucketName = fileInfo.bucketName;
    const Key = fileInfo?.appendRadomIdAsAFileKey
      ? appendRandomIdWithHyphenToText(file.originalname)
      : file.originalname;

    const uploadCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key,
      Body: bodyToUpload,
    });

    const secondsExpires = 3600;

    const uploadResultUrl = await getSignedUrl(this.s3Manager.S3, uploadCommand, {
      expiresIn: secondsExpires,
    });

    // not working with fetching put!
    // https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/s3-example-creating-buckets.html#s3-example-deleting-buckets
    // Creating a presigned URL

    await fetch(uploadResultUrl, { method: 'PUT', body: bodyToUpload });

    const data = await getSignedUrl(
      this.s3Manager.S3,
      new GetObjectCommand({
        Bucket: bucketName,
        Key: Key,
      }),
      {
        expiresIn: secondsExpires,
      },
    );

    return { data };
  }

  @Get('get-object/:bucketName')
  async getObject(
    @Param('bucketName') bucketName: string,
    @Query('ObjKey') objectKey: string,
  ) {
    const getObjectCommand = new GetObjectCommand({
      Bucket: bucketName,
      Key: objectKey,
    });

    const data = await this.s3Manager.S3.send(getObjectCommand);

    const streamToString = (stream: Stream) =>
      new Promise((resolve, reject) => {
        const chunks = [];

        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('error', reject);
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
      });

    const readableStream = data.Body as Stream;

    const bodyContens = await streamToString(readableStream);

    return bodyContens;
  }

  // https://www.npmjs.com/package/@aws-sdk/s3-request-presigner

  @Get('get-signed-url-to-get-object/:bucketName')
  async getSignedUrl(
    @Param('bucketName') bucketName: string,
    @Query('ObjKey') objectKey: string,
  ) {
    const getObjectCommand = new GetObjectCommand({
      Bucket: bucketName,
      Key: objectKey,
    });

    const data = await getSignedUrl(this.s3Manager.S3, getObjectCommand, {
      expiresIn: 60 * 60,
    });

    return { data };
  }

  @Get('list-objects/:bucketName')
  async listObjectInBucket(@Param('bucketName') bucketName: string) {
    const result = await this.s3Manager.S3.send(
      new ListObjectsCommand({ Bucket: bucketName }),
    );
    return {
      result,
    };
  }

  @Get('list-more-than-1000-objects/:bucketName')
  async listMoreThan100ObjectInBucket(@Param('bucketName') bucketName: string) {
    let listObjectParams: ListObjectsCommandInput = {
      Bucket: bucketName,
      // Marker: undefined,
    };

    let truncated = true;
    let pageMarker: string;

    let Contents: Array<_Object> = [];

    while (truncated) {
      const response = await this.s3Manager.S3.send(
        new ListObjectsCommand({ Bucket: bucketName }),
      );

      Contents = Contents.concat(response.Contents);

      truncated = response.IsTruncated;

      if (truncated) {
        const [lastObject] = response.Contents.slice(-1);
        pageMarker = lastObject.Key;

        listObjectParams = {
          ...listObjectParams,
          Marker: pageMarker,
        };
      }
    }

    return {
      Contents,
    };
  }

  @Delete('delete-bucket/:bucketName')
  async deleteBucket(@Param('bucketName') bucketName: string) {
    const result = await this.s3Manager.S3.send(
      new DeleteBucketCommand({ Bucket: bucketName }),
    );
    return {
      result,
    };
  }

  @Get('delete-object/:bucketName')
  async deleteObject(
    @Param('bucketName') bucketName: string,
    @Query('ObjKey') objectKey: string,
  ) {
    const getObjectCommand = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: objectKey,
    });

    const data = await this.s3Manager.S3.send(getObjectCommand);

    return { data };
  }

  @Delete('delete-all-in-bucket/:bucketName')
  async deleteAllInBucket(@Param('bucketName') bucketName: string) {
    const objects = await this.s3Manager.S3.send(
      new ListObjectsCommand({ Bucket: bucketName }),
    );

    const params: DeleteObjectsCommandInput = {
      Bucket: bucketName,
      Delete: {
        Objects: objects.Contents.map((obj) => ({ Key: obj.Key })),
        Quiet: false,
      },
    };

    const result = await this.s3Manager.S3.send(new DeleteObjectsCommand(params));

    return {
      result,
    };
  }
}
