import { Todo } from './entities/todo.entity';
import { Injectable } from '@nestjs/common';
import { LeanDocument } from 'mongoose';
import { ResponseTodo } from './dto/responses.dto';

@Injectable()
export class TodosMapService {
  public mapResponse(todo: LeanDocument<Todo>): ResponseTodo {
    const { _id, ...data } = todo;

    return {
      id: _id,
      ...data,
    } as unknown as ResponseTodo;
  }
}
