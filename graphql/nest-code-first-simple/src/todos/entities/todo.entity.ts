import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Todo {
  @Field(() => ID, { description: 'String id of todo' })
  id: string;

  name: string;
  isDone?: boolean;
  tag?: string;
}
