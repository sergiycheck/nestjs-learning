import { Injectable } from '@nestjs/common';
import { SQSClient } from '@aws-sdk/client-sqs';
import { ConfigService } from '@nestjs/config';
import { BaseAwsDataService } from 'src/common/services/base-aws-data.service';

@Injectable()
export class AwsSqsService extends BaseAwsDataService {
  sqsClient: SQSClient;

  constructor(protected configService: ConfigService) {
    super(configService);

    this.sqsClient = new SQSClient({
      region: this.AWS_REGION,
      credentials: {
        accessKeyId: this.IAM_USER_KEY_ID,
        secretAccessKey: this.IAM_USER_SECRET_ACCESS_KEY,
      },
      logger: console,
    });
  }
}
