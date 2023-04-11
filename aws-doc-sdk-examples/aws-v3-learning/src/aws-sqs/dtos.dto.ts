import { ApiProperty } from '@nestjs/swagger';
import { CreateQueueCommandInput } from '@aws-sdk/client-sqs';
import { IsNotEmpty, IsString } from 'class-validator';

class CreateQueueDtoAttributes {
  [key: string]: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '60' })
  DelaySeconds: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '86400' })
  MessageRetentionPeriod: string;
}

export class CreateQueueDto implements CreateQueueCommandInput {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'SQS_QUEUE_NAME' })
  QueueName: string;

  @IsNotEmpty()
  @ApiProperty({ type: CreateQueueDtoAttributes })
  Attributes: CreateQueueDtoAttributes;
}

export class GetQueueUrlDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'SQS_QUEUE_NAME' })
  QueueName: string;
}

export class DeleteQueueDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  QueueUrl: string;
}

export class SendMessageToQueueDto {
  @ApiProperty({ example: 10 })
  @IsNotEmpty()
  DelaySeconds: number;

  @ApiProperty({
    example: {
      Title: {
        DataType: 'String',
        StringValue: 'The Whistler',
      },
      Author: {
        DataType: 'String',
        StringValue: 'John Grisham',
      },
      WeeksOn: {
        DataType: 'Number',
        StringValue: '6',
      },
    },
  })
  @IsNotEmpty()
  MessageAttributes: any;

  @ApiProperty({
    example:
      'Information about current NY Times fiction bestseller for week of 12/11/2016.',
  })
  @IsNotEmpty()
  MessageBody: string;

  @ApiProperty({
    example: 'https://sqs.eu-central-1.amazonaws.com/581425740433/SQS_QUEUE_NAME',
  })
  @IsNotEmpty()
  QueueUrl: string;
}

export class ReceiveMessageDto {
  @ApiProperty({ example: ['SentTimestamp'] })
  @IsNotEmpty()
  AttributeNames: string[];

  @ApiProperty({ example: 10 })
  @IsNotEmpty()
  MaxNumberOfMessages: number;

  @ApiProperty({ example: ['All'] })
  @IsNotEmpty()
  MessageAttributeNames: string[];

  @ApiProperty({
    example: 'https://sqs.eu-central-1.amazonaws.com/581425740433/SQS_QUEUE_NAME',
  })
  @IsNotEmpty()
  QueueUrl: string;

  @ApiProperty({ example: 20 })
  @IsNotEmpty()
  VisibilityTimeout: number;

  @ApiProperty({ example: 0 })
  @IsNotEmpty()
  WaitTimeSeconds: number;
}
