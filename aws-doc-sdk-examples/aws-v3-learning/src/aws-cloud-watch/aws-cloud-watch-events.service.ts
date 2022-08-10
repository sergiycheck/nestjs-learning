import { BaseAwsDataService } from './../common/services/base-aws-data.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CloudWatchEventsClient } from '@aws-sdk/client-cloudwatch-events';

@Injectable()
export class AwsCloudWatchEventsService extends BaseAwsDataService {
  cwceClient: CloudWatchEventsClient;

  constructor(protected configService: ConfigService) {
    super(configService);

    this.cwceClient = new CloudWatchEventsClient({
      region: this.AWS_REGION,
      credentials: {
        accessKeyId: this.IAM_USER_KEY_ID,
        secretAccessKey: this.IAM_USER_SECRET_ACCESS_KEY,
      },
      logger: console,
    });
  }
}
