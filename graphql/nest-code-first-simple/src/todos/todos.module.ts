import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosInMemoryService } from './todos-in-memory.service';
import { TodosResolver } from './todos.resolver';
import { TodoModel, TodoSchema } from './entities/todo.mongo-entity ';
import { TodosMongoMapService } from './todos-map.service';
import { TodosMongoService } from './todos-mongo.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: TodoModel.name,
        useFactory: () => {
          const schema = TodoSchema;
          return schema;
        },
      },
    ]),
  ],
  providers: [
    TodosResolver,
    TodosInMemoryService,
    TodosMongoService,
    TodosMongoMapService,
  ],
})
export class TodosModule {}
