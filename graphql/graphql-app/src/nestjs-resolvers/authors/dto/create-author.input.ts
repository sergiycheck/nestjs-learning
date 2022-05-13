import { InputType, Int, Field, OmitType } from '@nestjs/graphql';
import { Author } from '../entities/author.entity';

// TODO: mapped types does not work somehow

@InputType()
export class CreateAuthorInput {
  @Field({ nullable: false })
  firstName: string;

  @Field({ nullable: false })
  lastName: string;
}
