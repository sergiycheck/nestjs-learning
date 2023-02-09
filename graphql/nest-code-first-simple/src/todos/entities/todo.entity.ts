import { ObjectType, Field, ID, OmitType } from '@nestjs/graphql';
import { TodoModel } from './todo.mongo-entity ';

@ObjectType()
export class Todo extends OmitType(TodoModel, ['_id'] as const) {
  @Field(() => ID, { description: 'Int id of todo' })
  id: number;
}
