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
  TableName = 'TEST_TABLE';
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
