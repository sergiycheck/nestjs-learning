import { ObjectType } from '@nestjs/graphql';
import { Todo } from '../entities/todo.entity';

@ObjectType()
export class ResponseTodo extends Todo {
  createdAt: string;
  updatedAt: string;
}

@ObjectType()
export class RemoveResponse {
  acknowledged: boolean;
  deletedCount: number;
}
