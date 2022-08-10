import { BaseAwsDataService } from './../common/services/base-aws-data.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CloudWatchClient } from '@aws-sdk/client-cloudwatch';

@Injectable()
export class AwsCloudWatchService extends BaseAwsDataService {
  cloudWatchClient: CloudWatchClient;

  constructor(protected configService: ConfigService) {
    super(configService);

    this.cloudWatchClient = new CloudWatchClient({
      region: this.AWS_REGION,
      credentials: {
        accessKeyId: this.IAM_USER_KEY_ID,
        secretAccessKey: this.IAM_USER_SECRET_ACCESS_KEY,
      },
      logger: console,
    });
  }
}
