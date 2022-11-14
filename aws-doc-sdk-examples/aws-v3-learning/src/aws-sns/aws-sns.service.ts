import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { BaseAwsDataService } from 'src/common/services/base-aws-data.service';
import { SNSClient } from '@aws-sdk/client-sns';

@Injectable()
export class AwsSnsService extends BaseAwsDataService {
  snsClient: SNSClient;

  constructor(protected configService: ConfigService) {
    super(configService);

    this.snsClient = new SNSClient({
      region: this.AWS_REGION,
      credentials: {
        accessKeyId: this.IAM_USER_KEY_ID,
        secretAccessKey: this.IAM_USER_SECRET_ACCESS_KEY,
      },
      logger: console,
    });
  }
}
