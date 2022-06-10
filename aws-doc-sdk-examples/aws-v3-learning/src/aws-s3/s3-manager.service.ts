import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as S3 from '@aws-sdk/client-s3';

@Injectable()
export class S3ManagerService {
  private AWS_REGION: string;
  private IAM_USER_KEY_ID: string;
  private IAM_USER_SECRET_ACCESS_KEY: string;
  private S3Client: S3.S3Client;

  constructor(private configService: ConfigService) {
    this.AWS_REGION = this.configService.get('AWS_REGION');
    this.IAM_USER_KEY_ID = this.configService.get('IAM_USER_KEY_ID');
    this.IAM_USER_SECRET_ACCESS_KEY = this.configService.get(
      'IAM_USER_SECRET_ACCESS_KEY',
    );

    this.S3Client = new S3.S3Client({
      region: this.AWS_REGION,
      credentials: {
        accessKeyId: this.IAM_USER_KEY_ID,
        secretAccessKey: this.IAM_USER_SECRET_ACCESS_KEY,
      },
      logger: console,
    });
  }

  get S3() {
    return this.S3Client;
  }
}
