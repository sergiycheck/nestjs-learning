import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BaseAwsDataService {
  protected AWS_REGION: string;
  protected IAM_USER_KEY_ID: string;
  protected IAM_USER_SECRET_ACCESS_KEY: string;

  constructor(protected configService: ConfigService) {
    this.AWS_REGION = this.configService.get('AWS_REGION');
    this.IAM_USER_KEY_ID = this.configService.get('IAM_USER_KEY_ID');
    this.IAM_USER_SECRET_ACCESS_KEY = this.configService.get(
      'IAM_USER_SECRET_ACCESS_KEY',
    );
  }
}
