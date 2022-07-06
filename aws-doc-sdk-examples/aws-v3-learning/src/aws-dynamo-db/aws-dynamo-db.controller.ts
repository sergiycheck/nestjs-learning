import { AwsDynamoDbClient } from './aws-dynamo-db.service';
import { AllExceptionsFromAwsFilter } from './../common/filters/all-exceptions-from-aws.filter';
import { Controller, Delete, Get, Post, Query, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateTableCommand,
  ListTablesCommand,
  DescribeTableCommand,
  DeleteTableCommand,
} from '@aws-sdk/client-dynamodb';
import { DescribeTableDto } from './dto/dto.dto';

@ApiTags('AwsDynamoDbController')
@Controller('aws-dynamodb-creating-using')
@UseFilters(AllExceptionsFromAwsFilter)
export class AwsDynamoDbController {
  constructor(private cldWS: AwsDynamoDbClient) {}

  @Post('create-table')
  async craateTable() {
    const params = {
      AttributeDefinitions: [
        {
          AttributeName: 'Season', //ATTRIBUTE_NAME_1
          AttributeType: 'N', //ATTRIBUTE_TYPE
        },
        {
          AttributeName: 'Episode', //ATTRIBUTE_NAME_2
          AttributeType: 'N', //ATTRIBUTE_TYPE
        },
      ],
      KeySchema: [
        {
          AttributeName: 'Season', //ATTRIBUTE_NAME_1
          KeyType: 'HASH',
        },
        {
          AttributeName: 'Episode', //ATTRIBUTE_NAME_2
          KeyType: 'RANGE',
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
      TableName: 'TEST_TABLE', //TABLE_NAME
      StreamSpecification: {
        StreamEnabled: false,
      },
    };

    return await this.cldWS.dDBCl.send(new CreateTableCommand(params));
  }

  @Get('list-tables')
  listTables() {
    return this.cldWS.dDBCl.send(new ListTablesCommand({}));
  }

  @Get('describe-table')
  describeTable(@Query() describeTableDto: DescribeTableDto) {
    return this.cldWS.dDBCl.send(new DescribeTableCommand({ ...describeTableDto }));
  }

  @Delete('one-table')
  deleteTable(@Query() dto: DescribeTableDto) {
    return this.cldWS.dDBCl.send(new DeleteTableCommand({ ...dto }));
  }
}
