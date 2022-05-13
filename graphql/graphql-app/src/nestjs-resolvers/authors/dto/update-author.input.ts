import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateAuthorInput {
  @Field((type) => Int)
  id: number;

  @Field()
  firstName?: string;

  @Field()
  lastName?: string;
}
