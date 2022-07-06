import { AwsDynamoDbController } from './aws-dynamo-db.controller';
import { ConfigModule } from '@nestjs/config';
import { AwsDynamoDbClient } from './aws-dynamo-db.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [ConfigModule],
  controllers: [AwsDynamoDbController],
  providers: [AwsDynamoDbClient],
})
export class AwsDynamoDbModule {}
