import {
  ConfirmSubscibtionToEmailDto,
  CreateTopicAttrsDto,
  CreateTopicDto,
  PublishMessageDto,
  SubscibeToOneOfDto,
  TopicAttrsDto,
  UnsubscribeFromDto,
} from './dtos';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AwsSnsService } from './aws-sns.service';
import {
  ConfirmSubscriptionCommand,
  CreateTopicCommand,
  DeleteTopicCommand,
  GetTopicAttributesCommand,
  ListSubscriptionsByTopicCommand,
  ListTopicsCommand,
  PublishCommand,
  SetTopicAttributesCommand,
  SubscribeCommand,
  UnsubscribeCommand,
} from '@aws-sdk/client-sns';

@ApiTags('AwsSnsController')
@Controller('aws-sns')
export class AwsSnsController {
  constructor(private readonly awsSnsService: AwsSnsService) {}

  @Post('create-topic')
  createTopic(@Body() dto: CreateTopicDto) {
    return this.awsSnsService.snsClient.send(new CreateTopicCommand(dto));
  }

  @Get('list-topics')
  listTopics() {
    return this.awsSnsService.snsClient.send(new ListTopicsCommand({}));
  }

  @Post('delete-topic-by-arn')
  deleteTopicByArn(@Body() dto: TopicAttrsDto) {
    return this.awsSnsService.snsClient.send(new DeleteTopicCommand(dto));
  }

  @Get('topic-attributes')
  getTopicAttributes(@Query() dto: TopicAttrsDto) {
    return this.awsSnsService.snsClient.send(new GetTopicAttributesCommand(dto));
  }

  @Post('topic-attributes')
  sendTopicAttributes(@Body() dto: CreateTopicAttrsDto) {
    return this.awsSnsService.snsClient.send(new SetTopicAttributesCommand(dto));
  }

  @Post('public-message-to-topic')
  publicMessageToTopic(@Body() dto: PublishMessageDto) {
    return this.awsSnsService.snsClient.send(new PublishCommand(dto));
  }

  @Get('list-subscriptions-by-topic')
  listSubscriptionsByTopi(@Query() dto: TopicAttrsDto) {
    return this.awsSnsService.snsClient.send(new ListSubscriptionsByTopicCommand(dto));
  }

  @Post('subsribe-to-one-of')
  subscribeToOneOf(@Body() dto: SubscibeToOneOfDto) {
    return this.awsSnsService.snsClient.send(new SubscribeCommand(dto));
  }

  @Post('confirm-subscription-to-email')
  confirmSubscribtionToEmail(@Body() dto: ConfirmSubscibtionToEmailDto) {
    return this.awsSnsService.snsClient.send(new ConfirmSubscriptionCommand(dto));
  }

  @Post('unsubscribe-from')
  unsubscribeFrom(@Body() dto: UnsubscribeFromDto) {
    return this.awsSnsService.snsClient.send(new UnsubscribeCommand(dto));
  }
}
