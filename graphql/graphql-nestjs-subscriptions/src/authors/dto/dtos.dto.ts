import { InputType, Int, Field, OmitType } from '@nestjs/graphql';

@InputType()
export class CreateAuthorInput {
  @Field({ nullable: false })
  firstName: string;

  @Field({ nullable: false })
  lastName: string;
}

@InputType()
export class UpdateAuthorInput {
  @Field((type) => Int)
  id: number;

  @Field()
  firstName?: string;

  @Field()
  lastName?: string;
}
