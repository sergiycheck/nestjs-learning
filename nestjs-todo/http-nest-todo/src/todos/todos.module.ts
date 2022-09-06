import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { Todo, TodoSchema } from './entities/todo.entity';
import { TodosMapService } from './todos-map.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Todo.name,
        useFactory: () => {
          const schema = TodoSchema;
          return schema;
        },
      },
    ]),
  ],
  controllers: [TodosController],
  providers: [TodosService, TodosMapService],
})
export class TodosModule {}
