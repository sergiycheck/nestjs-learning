import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Todo {
  @Field(() => Int, { description: 'Int id of todo' })
  id: number;

  name: string;
  createdAt: number;
  isDone?: boolean;
  tag?: string;
}
