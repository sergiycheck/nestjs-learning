import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument, Model } from 'mongoose';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { TodoModel, TodoDocument } from './entities/todo.mongo-entity ';
import { FindAllArgs } from './dto/findAll.args';
import { TodosMongoMapService } from './todos-map.service';
import GetTodosArgs from './dto/get-todos.args';

@Injectable()
export class TodosMongoService {
  constructor(
    @InjectModel(TodoModel.name) public model: Model<TodoDocument>,
    private readonly todosMapService: TodosMongoMapService,
  ) {}

  async create(createTodoDto: CreateTodoInput) {
    const todo = new this.model({
      ...createTodoDto,
    });
    const newTodo = await todo.save();
    const obj = newTodo.toObject() as LeanDocument<TodoModel>;
    return this.todosMapService.mapResponse(obj);
  }

  async findAll(dto: FindAllArgs) {
    const skip = (dto.page - 1) * dto.limit;
    const arrQuery = await this.model.find({}).skip(skip).limit(dto.limit);
    return arrQuery.map((o) => this.todosMapService.mapResponse(o.toObject()));
  }

  async findOne(id: string) {
    const todo = (await this.model.findById(id).lean()) as LeanDocument<TodoModel>;
    return this.todosMapService.mapResponse(todo);
  }

  async update(id: string, updateTodoDto: UpdateTodoInput) {
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

  async remove(id: string) {
    return await this.model.deleteOne({ _id: id });
  }

  async getTodosByArgs(args: GetTodosArgs) {
    // return Object.values(items).filter(
    //   (a) => a.name.startsWith(args.name) || a.tag.startsWith(args.tag),
    // );

    const arrQuery = await this.model.find({
      $or: [{ name: { $regex: args.name } }, { tag: { $regex: args.tag } }],
    });
    return arrQuery.map((o) => this.todosMapService.mapResponse(o.toObject()));
  }
}
