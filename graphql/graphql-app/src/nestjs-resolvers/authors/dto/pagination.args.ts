import { MinLength } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';

abstract class PaginationArgs {
  firstName?: string;
  lastName?: string;
}

@ArgsType()
export class GetAuthorArgs extends PaginationArgs {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ defaultValue: '' })
  @MinLength(3)
  lastName: string;
}
