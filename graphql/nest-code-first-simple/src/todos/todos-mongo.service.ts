import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import {
  ProjectionType,
  FilterQuery,
  LeanDocument,
  Model,
  ObjectId,
  Types,
} from 'mongoose';

import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { TodoModel, TodoDocument } from './entities/todo.mongo-entity ';
import { FindAllArgs, GetPaginatedCursor } from './dto/findAll.args';
import { TodosMongoMapService } from './todos-map.service';
import GetTodosArgs from './dto/get-todos.args';
import { PaginatedResponseTodo } from './dto/responses.dto';
import { Connection } from 'mongoose';

@Injectable()
export class TodosMongoService {
  constructor(
    @InjectModel(TodoModel.name) public model: Model<TodoDocument>,
    private readonly todosMapService: TodosMongoMapService,
    @InjectConnection() private connection: Connection,
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

  async queryCursorBasedPaginated(
    dto: GetPaginatedCursor,
  ): Promise<PaginatedResponseTodo> {
    const TodoCollectionName = 'todomodels';
    const findAllCursorPaginatedQuery: FilterQuery<TodoDocument> = {};

    const findAllCursorPaginatedProjection: ProjectionType<TodoDocument> = {
      limit: dto.limit,
      sort: {
        _id: -1,
      },
    };

    const { previousPageCursor, nextPageCursor } = dto;
    if (nextPageCursor) {
      findAllCursorPaginatedQuery._id = { $lt: new Types.ObjectId(nextPageCursor) };
    } else if (previousPageCursor) {
      findAllCursorPaginatedQuery._id = { $gt: new Types.ObjectId(previousPageCursor) };
      findAllCursorPaginatedProjection.sort._id = 1;
    }

    const arrQuery = (await this.connection.db
      .collection(TodoCollectionName)
      .find(findAllCursorPaginatedQuery, findAllCursorPaginatedProjection)
      .toArray()) as TodoDocument[];

    if (previousPageCursor) arrQuery.reverse();

    let hasNextPage = false;
    let hasPrevPage = false;
    let lastItemId,
      firstItemId = '';

    if (arrQuery.length) {
      firstItemId = arrQuery[0]._id;
      lastItemId = arrQuery[arrQuery.length - 1]._id;

      const query: FilterQuery<TodoDocument> = { _id: { $lt: lastItemId } };
      const nextPageResult = await this.connection.db
        .collection(TodoCollectionName)
        .find(query, {
          limit: dto.limit,
          sort: { _id: -1 },
        })
        .toArray();

      hasNextPage = !!nextPageResult.length;

      query._id = {
        $gt: firstItemId,
      };
      const prevPageResult = await this.connection.db
        .collection(TodoCollectionName)
        .find(query, {
          limit: dto.limit,
          sort: { _id: 1 },
        })
        .toArray();
      hasPrevPage = !!prevPageResult.length;
    }

    const mappedTodosToEdges = arrQuery.length
      ? arrQuery.map((itemObject) => {
          return {
            cursor: itemObject._id.toString(),
            node: this.todosMapService.mapResponse(itemObject),
          };
        })
      : [
          {
            cursor: null,
            node: null,
          },
        ];

    return {
      edges: mappedTodosToEdges,
      pageInfo: {
        startCursor: firstItemId.toString(),
        endCursor: lastItemId.toString(),
        hasPreviousPage: hasPrevPage,
        hasNextPage,
      },
    };
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
