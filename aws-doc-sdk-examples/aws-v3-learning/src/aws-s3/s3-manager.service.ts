import { BaseAwsDataService } from './../common/services/base-aws-data.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class S3ManagerService extends BaseAwsDataService {
  private S3Client: S3Client;

  constructor(protected configService: ConfigService) {
    super(configService);

    this.S3Client = new S3Client({
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
