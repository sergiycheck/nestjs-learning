import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateTodoDto } from './create-todo.dto';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsNotEmpty()
  @IsString()
  id: string;
}
