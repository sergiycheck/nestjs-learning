import { Injectable } from '@nestjs/common';
import { LeanDocument } from 'mongoose';
import { ResponseTodo } from './dto/responses.dto';
import { TodoModel } from './entities/todo.mongo-entity ';

@Injectable()
export class TodosMongoMapService {
  public mapResponse(todo: LeanDocument<TodoModel>): ResponseTodo {
    const { _id, ...data } = todo;

    return {
      id: _id,
      ...data,
    } as unknown as ResponseTodo;
  }
}
