import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AwsSqsService } from './aws-sqs.service';
import {
  CreateQueueCommand,
  DeleteMessageCommand,
  DeleteQueueCommand,
  GetQueueUrlCommand,
  ListQueuesCommand,
  ReceiveMessageCommand,
  SendMessageCommand,
} from '@aws-sdk/client-sqs';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateQueueDto,
  DeleteQueueDto,
  GetQueueUrlDto,
  ReceiveMessageDto,
  SendMessageToQueueDto,
} from './dtos.dto';

@Controller('aws-sqs')
@ApiTags('AwsSqsController')
export class AwsSqsController {
  constructor(private readonly awsSqsService: AwsSqsService) {}

  @Get('list-queues')
  listQueues() {
    return this.awsSqsService.sqsClient.send(new ListQueuesCommand({}));
  }

  @Post('create-queue')
  create(@Body() dto: CreateQueueDto) {
    return this.awsSqsService.sqsClient.send(new CreateQueueCommand(dto));
  }

  @Get('queue-url')
  getQueueUrl(@Query() dto: GetQueueUrlDto) {
    return this.awsSqsService.sqsClient.send(new GetQueueUrlCommand(dto));
  }

  @Post('delete-queue')
  deleteQueue(@Body() dto: DeleteQueueDto) {
    return this.awsSqsService.sqsClient.send(new DeleteQueueCommand(dto));
  }

  @Post('send-message')
  sendMessage(@Body() dto: SendMessageToQueueDto) {
    return this.awsSqsService.sqsClient.send(new SendMessageCommand(dto));
  }

  @Post('receive-and-delete-messges')
  async receiveAndDeleteMessages(@Body() dto: ReceiveMessageDto) {
    const data = await this.awsSqsService.sqsClient.send(new ReceiveMessageCommand(dto));

    console.log('received messages', data);

    if (data.Messages) {
      const deleteParams = {
        QueueUrl: dto.QueueUrl,
        ReceiptHandle: data.Messages[0].ReceiptHandle,
      };

      return this.awsSqsService.sqsClient.send(new DeleteMessageCommand(deleteParams));
    }
  }
}
