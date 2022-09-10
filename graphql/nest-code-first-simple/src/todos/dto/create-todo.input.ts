import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateTodoInput {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  isDone?: boolean;

  @IsOptional()
  tag?: string;
}
