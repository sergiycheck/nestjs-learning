import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { Todo, TodoSchema } from './entities/todo.entity';

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
  providers: [TodosService],
})
export class TodosModule {}
