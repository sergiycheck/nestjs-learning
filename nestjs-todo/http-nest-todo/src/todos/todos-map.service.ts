import { Todo } from './entities/todo.entity';
import { Injectable } from '@nestjs/common';
import { LeanDocument } from 'mongoose';

@Injectable()
export class TodosMapService {
  public mapResponse(todo: LeanDocument<Todo>) {
    const { _id, ...data } = todo;

    return {
      id: _id,
      ...data,
    };
  }
}
