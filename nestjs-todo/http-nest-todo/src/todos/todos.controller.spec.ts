import { TodosMapService } from './todos-map.service';
import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { getModelToken } from '@nestjs/mongoose';
import { Todo, TodoDocument } from './entities/todo.entity';
import { Model } from 'mongoose';

describe('TodosController', () => {
  let todosController: TodosController;
  let todosService: TodosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        TodosService,
        TodosMapService,
        {
          provide: getModelToken(Todo.name),
          useValue: Model<TodoDocument>,
        },
      ],
    }).compile();

    todosController = module.get<TodosController>(TodosController);
    todosService = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(todosController).toBeDefined();
    expect(todosService).toBeDefined();
  });

  it('creates todo', async () => {
    const json = `
    {
      "id": "6317a97bebdd220a0cf11576",
      "name": "name1",
      "description": "description 1",
      "completed": false,
      "createdAt": "2022-09-06T20:11:39.764Z",
      "updatedAt": "2022-09-06T20:11:39.764Z"
    }`;
    const result = JSON.parse(json);
    const dto = {
      name: result.name,
      description: result.description,
      completed: result.description,
    };

    jest.spyOn(todosService, 'create').mockImplementation(() => result);

    expect(await todosController.create(dto)).toEqual(result);
  });
});
