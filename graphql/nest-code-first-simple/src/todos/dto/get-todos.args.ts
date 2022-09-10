import { Field, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@ArgsType()
class GetTodosArgs {
  @IsNotEmpty()
  name: string;

  @Field({ defaultValue: '' })
  @IsOptional()
  tag?: string;
}
export default GetTodosArgs;
