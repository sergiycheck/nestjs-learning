import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateTableDto {
  @IsNotEmpty()
  @IsString()
  TableName = 'TEST_TABLE';
}

export class DescribeTableDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ name: 'TableName', type: String })
  TableName = 'CUSTOMERS';
}

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsNumberString()
  CUSTOMER_ID = '1';

  @IsNotEmpty()
  @IsString()
  CUSTOMER_NAME = 'Richard Roe';
}

export class GetCustomerDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ name: 'CUSTOMER_ID', type: String })
  CUSTOMER_ID = '1';

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ name: 'CUSTOMER_NAME', type: String })
  CUSTOMER_NAME = 'Richard Roe';
}

export class UpdateCustomerDto {
  @IsNotEmpty()
  @IsNumberString()
  CUSTOMER_ID = '3';

  @IsNotEmpty()
  @IsString()
  CUSTOMER_NAME = 'Denis Olsem';

  @IsNotEmpty()
  @IsString()
  updateEmail = 'someEmail@domain.com';

  @IsNotEmpty()
  @IsNumberString()
  updatePhone = '133233233';
}

export class Dynamo_N {
  @IsNotEmpty()
  @IsNumberString()
  N: string;
}

export class Dynamo_S {
  @IsNotEmpty()
  @IsString()
  S: string;
}

export class ReadCustomersBatchDto {
  @IsNotEmpty()
  @IsString()
  TABLE_NAME = 'CUSTOMERS';

  @IsNotEmpty()
  keys: Record<string, Dynamo_N>;
}

export class WriteCustomersBatchDto {
  @IsNotEmpty()
  @IsString()
  TABLE_NAME = 'CUSTOMERS';
}

export class ListItemsDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ name: 'TableName', type: String })
  TableName = 'CUSTOMERS';
}

export class QueryItemsDto extends ListItemsDto {
  @IsNotEmpty()
  @IsNumberString()
  custId = '3';

  @IsNotEmpty()
  @IsString()
  custName = 'Denis Olsem';

  @IsNotEmpty()
  @IsString()
  email = 'den@domain.com';
}
