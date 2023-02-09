import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoInput } from './dto/create-todo.input';
import GetTodosArgs from './dto/get-todos.args';
import { UpdateTodoInput } from './dto/update-todo.input';
import { Todo } from './entities/todo.entity';

export const items: { [key: number]: Todo } = {
  1: {
    id: 1,
    name: 'todo 1',
    isDone: false,
    tag: 'cooking',
  },
  2: {
    id: 2,
    name: 'todo 2',
    isDone: false,
    tag: 'cooking, eating',
  },
  3: {
    id: 3,
    name: 'do something',
    isDone: false,
    tag: 'cycling',
  },
  4: {
    id: 4,
    name: 'do smth usefull',
    isDone: false,
    tag: 'coding',
  },
};

@Injectable()
export class TodosInMemoryService {
  create(input: CreateTodoInput) {
    const item: Todo = {
      ...input,
      id: Object.keys(items).length + 1,
      tag: input.tag ?? null,
      isDone: input.isDone ?? false,
    };
    items[item.id] = item;
    return items[item.id];
  }

  findAll() {
    return Object.values(items);
  }

  findOne(id: number) {
    const item = items[id];
    if (!item) throw new NotFoundException(`item with id ${id} was not found`);
    return item;
  }

  update(id: number, updateInput: UpdateTodoInput) {
    const item = this.findOne(id);
    items[id] = {
      ...item,
      ...updateInput,
    };

    return items[id];
  }

  remove(id: number) {
    const item = this.findOne(id);
    delete items[id];
    return item;
  }

  getTodosByArgs(args: GetTodosArgs) {
    return Object.values(items).filter(
      (a) => a.name.startsWith(args.name) || a.tag.startsWith(args.tag),
    );
  }
}
