import {
  ListItemsDto,
  QueryItemsDto,
  ReadCustomersBatchDto,
  WriteCustomersBatchDto,
} from './dto/dto.dto';
import { AwsDynamoDbClient } from './aws-dynamo-db.service';
import { AllExceptionsFromAwsFilter } from './../common/filters/all-exceptions-from-aws.filter';
import { Body, Controller, Get, Post, Query, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  BatchGetItemCommand,
  BatchGetItemCommandInput,
  BatchWriteItemCommand,
  QueryCommand,
  ScanCommand,
} from '@aws-sdk/client-dynamodb';

@ApiTags('AwsDynamoDbRWBatchController')
@Controller('aws-dynamodb-rw-batch')
@UseFilters(AllExceptionsFromAwsFilter)
export class AwsDynamoDbRWBatchController {
  constructor(private cldWS: AwsDynamoDbClient) {}

  @Post('read-batch')
  postReadBatch(@Body() dto: ReadCustomersBatchDto) {
    const params: BatchGetItemCommandInput = {
      RequestItems: {
        [dto.TABLE_NAME]: {
          Keys: [
            {
              CUSTOMER_ID: { N: '2' },
              CUSTOMER_NAME: { S: 'brandon goode' },
              ...dto.keys,
            },
          ],
        },
      },
    };

    return this.cldWS.dDBCl.send(new BatchGetItemCommand(params));
  }

  @Post('write-batch')
  postWriteBatch(@Body() dto: WriteCustomersBatchDto) {
    const params = {
      RequestItems: {
        [dto.TABLE_NAME]: [
          {
            PutRequest: {
              Item: {
                CUSTOMER_ID: { N: '2' },
                CUSTOMER_NAME: { S: 'brandon goode' },
                email: { S: 'changedEmail1@domain.com' },
              },
            },
          },
          {
            PutRequest: {
              Item: {
                CUSTOMER_ID: { N: '3' },
                CUSTOMER_NAME: { S: 'Denis Olsem' },
                email: { S: 'den@domain.com' },
              },
            },
          },
        ],
      },
    };

    return this.cldWS.dDBCl.send(new BatchWriteItemCommand(params));
  }

  @Get('list-items')
  listItems(@Query() dto: ListItemsDto) {
    const params = {
      TableName: dto.TableName,
    };

    return this.cldWS.dDBCl.send(new ScanCommand(params));
  }

  @Get('scan-items')
  scanItems(@Query() dto: ListItemsDto) {
    // const params = {
    //   // Specify which items in the results are returned.
    //   FilterExpression: 'CUSTOMER_NAME = :cn AND comp = :comp',
    //   // Define the expression attribute value,
    //   //which are substitutes for the values you want to compare.
    //   ExpressionAttributeValues: {
    //     ':cn': { S: 'brandon goode' },
    //     ':comp': { S: 'name1' },
    //   },
    //   // Set the projection expression, which the the attributes that you want.
    //   ProjectionExpression: 'CUSTOMER_ID, email',
    //   TableName: dto.TableName,
    // };

    const params = {
      FilterExpression: 'comp = :comp',
      ExpressionAttributeValues: {
        ':comp': { S: 'name1' },
      },
      ProjectionExpression: 'CUSTOMER_ID, email, comp',
      TableName: dto.TableName,
    };

    return this.cldWS.dDBCl.send(new ScanCommand(params));
  }

  @Post('query-items')
  queryItems(@Body() dto: QueryItemsDto) {
    const params = {
      KeyConditionExpression: 'CUSTOMER_ID = :custId and CUSTOMER_NAME = :custName',
      FilterExpression: 'contains (email, :em)',
      ExpressionAttributeValues: {
        ':custId': { N: dto.custId },
        ':custName': { S: dto.custName },
        ':em': { S: dto.email },
      },
      ProjectionExpression: 'custId, CUSTOMER_ID, CUSTOMER_NAME, comp, email',
      TableName: dto.TableName,
    };

    return this.cldWS.dDBCl.send(new QueryCommand(params));
  }
}
