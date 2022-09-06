import { TodosMapService } from './todos-map.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument, Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, TodoDocument } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo.name) public model: Model<TodoDocument>,
    private readonly todosMapService: TodosMapService,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    const todo = new this.model({
      ...createTodoDto,
    });
    const newTodo = await todo.save();
    const obj = newTodo.toObject() as LeanDocument<Todo>;
    return this.todosMapService.mapResponse(obj);
  }

  async findAll() {
    const arrQuery = await this.model.find({});
    return arrQuery.map((o) => this.todosMapService.mapResponse(o.toObject()));
  }

  async findOne(id: string) {
    const todo = (await this.model.findById(id).lean()) as LeanDocument<Todo>;
    return this.todosMapService.mapResponse(todo);
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

    return this.todosMapService.mapResponse(updateTodo);
  }

  remove(id: string) {
    return this.model.deleteOne({ _id: id });
  }
}
