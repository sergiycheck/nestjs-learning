import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DescribeTableDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ name: 'TableName', type: String })
  TableName = 'TEST_TABLE';
}
