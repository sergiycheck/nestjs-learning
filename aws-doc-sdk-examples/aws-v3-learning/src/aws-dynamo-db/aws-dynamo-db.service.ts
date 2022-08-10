import { BaseAwsDataService } from './../common/services/base-aws-data.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

@Injectable()
export class AwsDynamoDbClient extends BaseAwsDataService {
  dDBCl: DynamoDBClient;

  constructor(protected configService: ConfigService) {
    super(configService);

    this.dDBCl = new DynamoDBClient({
      region: this.AWS_REGION,
      credentials: {
        accessKeyId: this.IAM_USER_KEY_ID,
        secretAccessKey: this.IAM_USER_SECRET_ACCESS_KEY,
      },
      logger: console,
    });
  }
}
