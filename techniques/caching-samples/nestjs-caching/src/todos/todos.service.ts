import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument, Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, TodoDocument } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) public model: Model<TodoDocument>) {}
  async create(createTodoDto: CreateTodoDto) {
    const todo = new this.model({
      ...createTodoDto,
    });
    const newTodo = await todo.save();
    const obj = newTodo.toObject() as LeanDocument<Todo>;
    return this.mapResponse(obj);
  }

  private mapResponse(todo: LeanDocument<Todo>) {
    const { _id, ...data } = todo;

    return {
      id: _id,
      ...data,
    };
  }

  async findAll() {
    const arrQuery = await this.model.find({});
    return arrQuery.map((o) => this.mapResponse(o.toObject()));
  }

  async findOne(id: string) {
    const todo = (await this.model.findById(id).lean()) as LeanDocument<Todo>;
    return this.mapResponse(todo);
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    const exists = await this.model.exists({ _id: id });
    if (!exists) throw new NotFoundException(`todo with id ${id} doesn't exist `);

    const { id: idDto, ...updateData } = updateTodoDto;
    const updateTodo = await this.model
      .findOneAndUpdate(
        { _id: idDto },
        { ...updateData },
        { runValidators: true, new: true },
      )
      .lean();

    return this.mapResponse(updateTodo);
  }

  remove(id: string) {
    return this.model.deleteOne({ _id: id });
  }
}
