import { BaseAwsDataService } from './../common/services/base-aws-data.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CloudWatchLogsClient } from '@aws-sdk/client-cloudwatch-logs';

@Injectable()
export class AwsCloudWatchLogsService extends BaseAwsDataService {
  cloudWatchClient: CloudWatchLogsClient;

  constructor(protected configService: ConfigService) {
    super(configService);

    this.cloudWatchClient = new CloudWatchLogsClient({
      region: this.AWS_REGION,
      credentials: {
        accessKeyId: this.IAM_USER_KEY_ID,
        secretAccessKey: this.IAM_USER_SECRET_ACCESS_KEY,
      },
      logger: console,
    });
  }
}
