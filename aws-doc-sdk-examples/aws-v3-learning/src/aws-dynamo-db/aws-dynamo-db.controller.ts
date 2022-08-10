import { NotEmptyPipe } from './../pipes/not-empty.pipe';
import { AwsDynamoDbClient } from './aws-dynamo-db.service';
import { AllExceptionsFromAwsFilter } from './../common/filters/all-exceptions-from-aws.filter';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateTableCommand,
  ListTablesCommand,
  DescribeTableCommand,
  DeleteTableCommand,
  CreateTableCommandInput,
  PutItemCommand,
  PutItemCommandInput,
  GetItemCommand,
  UpdateItemCommand,
  DeleteItemCommand,
} from '@aws-sdk/client-dynamodb';
import {
  DescribeTableDto,
  CreateTableDto,
  CreateCustomerDto,
  GetCustomerDto,
  UpdateCustomerDto,
} from './dto/dto.dto';

// core components of dynamodb
// https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.CoreComponents.html

// orm for dynamodb
// https://github.com/dynamoose/dynamoose

@ApiTags('AwsDynamoDbController')
@Controller('aws-dynamodb')
@UseFilters(AllExceptionsFromAwsFilter)
export class AwsDynamoDbController {
  constructor(private cldWS: AwsDynamoDbClient) {}

  @Post('create-table')
  async craateTable(@Body() createTableDto: CreateTableDto) {
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
      ...createTableDto, //TABLE_NAME
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

  // AttributeDefinition
  // https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_AttributeDefinition.html

  @Post('create-table-customers')
  async craateTableCustomers(@Body() createTableDto: CreateTableDto) {
    const params: CreateTableCommandInput = {
      AttributeDefinitions: [
        {
          AttributeName: 'CUSTOMER_ID',
          AttributeType: 'N',
        },
        {
          AttributeName: 'CUSTOMER_NAME',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'CUSTOMER_ID', //ATTRIBUTE_NAME_1
          KeyType: 'HASH',
        },
        {
          AttributeName: 'CUSTOMER_NAME', //ATTRIBUTE_NAME_2
          KeyType: 'RANGE',
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
      ...createTableDto, //TABLE_NAME
      StreamSpecification: {
        StreamEnabled: true,
        StreamViewType: 'NEW_AND_OLD_IMAGES',
      },
    };

    return await this.cldWS.dDBCl.send(new CreateTableCommand(params));
  }

  @Post('writing-customer-item/:TableName')
  createCustomer(
    @Param('TableName', new NotEmptyPipe('TableName')) TableName: string,
    @Body() dto: CreateCustomerDto,
  ) {
    const params: PutItemCommandInput = {
      TableName,
      Item: {
        CUSTOMER_ID: { N: dto.CUSTOMER_ID },
        CUSTOMER_NAME: { S: dto.CUSTOMER_NAME },
      },
    };
    return this.cldWS.dDBCl.send(new PutItemCommand(params));
  }

  @Get('get-customer/:TableName')
  getCustomer(
    @Param('TableName', new NotEmptyPipe('TableName')) TableName: string,
    @Query() dto: GetCustomerDto,
  ) {
    const params = {
      TableName,
      Key: {
        CUSTOMER_ID: { N: dto.CUSTOMER_ID },
        CUSTOMER_NAME: { S: dto.CUSTOMER_NAME },
      },
    };
    return this.cldWS.dDBCl.send(new GetItemCommand(params));
  }

  // update expressions
  // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.UpdateExpressions.html
  @Patch('update-customer/:TableName')
  updateCustomer(
    @Param('TableName', new NotEmptyPipe('TableName')) TableName: string,
    @Body() dto: UpdateCustomerDto,
  ) {
    // String: "String",
    // NumAttribute: 1,
    // BoolAttribute: true,
    // ListAttribute: [1, "two", false],
    // MapAttribute: { foo: "bar" },
    // NullAttribute: null

    const updateParams = {
      TableName,
      Key: {
        // For example, 'Season': {N:2}.
        CUSTOMER_ID: { N: dto.CUSTOMER_ID },
        // For example,  'Episode': {S: "The return"};
        // (only required if table has sort key).
        CUSTOMER_NAME: { S: dto.CUSTOMER_NAME },
      },
      // Define expressions for the new or updated attributes
      // For example, "'set Title = :t, Subtitle = :s'"
      UpdateExpression: 'set email = :t, phone = :s',
      ExpressionAttributeValues: {
        // Cannot update attribute CUSTOMER_NAME. This attribute is part of the key
        // ':id': { N: dto.updateId },
        // ':n': { S: dto.updateName },
        // For example ':t' : 'NEW_TITLE'
        ':t': { S: dto.updateEmail },
        // For example ':s' : 'NEW_SUBTITLE'
        ':s': { S: dto.updatePhone },
      },
      ReturnValues: 'ALL_NEW',
    };

    return this.cldWS.dDBCl.send(new UpdateItemCommand(updateParams));
  }

  @Delete('delete-customer/:TableName')
  deleteCustomer(
    @Param('TableName', new NotEmptyPipe('TableName')) TableName: string,
    @Query() dto: GetCustomerDto,
  ) {
    const params = {
      TableName,
      Key: {
        CUSTOMER_ID: { N: dto.CUSTOMER_ID },
        CUSTOMER_NAME: { S: dto.CUSTOMER_NAME },
      },
    };
    return this.cldWS.dDBCl.send(new DeleteItemCommand(params));
  }
}
