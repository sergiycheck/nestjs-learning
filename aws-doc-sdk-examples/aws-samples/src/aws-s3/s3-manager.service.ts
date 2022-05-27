import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

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
      logger: console,
    });
  }

  get S3() {
    return this._S3;
  }
}
