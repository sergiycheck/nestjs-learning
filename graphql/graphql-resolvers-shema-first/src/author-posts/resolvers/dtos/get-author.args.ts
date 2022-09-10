import { Field, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@ArgsType()
class GetAuthorArgs {
  @Field({ nullable: true })
  @IsOptional()
  firstName?: string;

  @Field({ defaultValue: '' })
  @IsNotEmpty()
  lastName: string;
}
export default GetAuthorArgs;
