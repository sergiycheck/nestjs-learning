import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsIn, IsNotEmpty, IsString } from 'class-validator';
import { isString } from 'lodash';

export class CreateTopicDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ name: 'Name', type: String, default: 'topic_name' })
  Name: string;
}

export class TopicAttrsDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  TopicArn: string;
}

export enum TopicAttrsEnum {
  Policy = 'Policy',
  DisplayName = 'DisplayName',
  DeliveryPolicy = 'DeliveryPolicy',
}

export class CreateTopicAttrsDto extends TopicAttrsDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(['Policy', 'DisplayName', 'DeliveryPolicy'])
  @ApiProperty({ name: 'AttributeName', enum: TopicAttrsEnum })
  AttributeName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  AttributeValue: string;
}

export class PublishMessageDto extends TopicAttrsDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  Message: string;
}

export enum TopicSubscriptionProtocols {
  email = 'email',
  application = 'application',
  lambda = 'lambda',
}
export class SubscibeToOneOfDto extends TopicAttrsDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(['email', 'application', 'lambda'])
  @ApiProperty({ name: 'Protocol', enum: TopicSubscriptionProtocols })
  Protocol: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ name: 'Endpoint', description: 'email address' })
  Endpoint: string;
}

export class ConfirmSubscibtionToEmailDto extends TopicAttrsDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  Token: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['true', 'false'])
  @ApiProperty()
  AuthenticateOnUnsubscribe: string;
}

export class UnsubscribeFromDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  SubscriptionArn: string;
}
