import { AwsDynamoDbRWBatchController } from './dynamodb-rw-batch.controller';
import { AwsDynamoDbController } from './aws-dynamo-db.controller';
import { ConfigModule } from '@nestjs/config';
import { AwsDynamoDbClient } from './aws-dynamo-db.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [ConfigModule],
  controllers: [AwsDynamoDbController, AwsDynamoDbRWBatchController],
  providers: [AwsDynamoDbClient],
})
export class AwsDynamoDbModule {}
