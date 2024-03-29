import { CreateTodoInput } from './create-todo.input';
import { InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateTodoInput extends PartialType(CreateTodoInput) {
  @IsNotEmpty()
  id: string;
}
