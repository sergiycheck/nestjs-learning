import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 20)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  completed: boolean;
}
