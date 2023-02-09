import { InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateTodoInput {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  isDone: boolean;

  @IsOptional()
  tag?: string;
}
