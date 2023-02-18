import { ObjectType, Field } from '@nestjs/graphql';
import { Todo } from '../entities/todo.entity';

@ObjectType()
export class ResponseTodo extends Todo {
  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}

@ObjectType()
export class RemoveResponse {
  @Field()
  acknowledged: boolean;

  @Field()
  deletedCount: number;
}
