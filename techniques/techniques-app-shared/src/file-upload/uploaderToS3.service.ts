import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { editFileName, imageFileFilter, getFileKeyFromFile } from './file-upload.utils';

@Injectable()
export class UploaderToS3Service {
  private BUCKET_NAME: string;
  private IAM_USER_KEY_ID: string;
  private IAM_USER_SECRET_ACCESS_KEY;
  private s3bucket: AWS.S3;

  constructor(private configService: ConfigService) {
    this.BUCKET_NAME = this.configService.get('BUCKET_NAME');
    this.IAM_USER_KEY_ID = this.configService.get('IAM_USER_KEY_ID');
    this.IAM_USER_SECRET_ACCESS_KEY = this.configService.get('IAM_USER_SECRET_ACCESS_KEY');

    this.s3bucket = new AWS.S3({
      accessKeyId: this.IAM_USER_KEY_ID,
      secretAccessKey: this.IAM_USER_SECRET_ACCESS_KEY,
    });
  }

  uploadToS3(file: Express.Multer.File) {
    return new Promise((resolve, reject) => {
      const params = { Body: file.buffer, Bucket: this.BUCKET_NAME, Key: getFileKeyFromFile(file) };
      this.s3bucket.putObject(params, function (err, data) {
        if (err) {
          console.log(err);
          return reject(err);
        }
        console.log(data);
        return resolve(data);
      });
    });
  }
}
