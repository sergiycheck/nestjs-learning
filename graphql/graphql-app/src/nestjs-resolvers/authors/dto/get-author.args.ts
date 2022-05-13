import { MinLength } from 'class-validator';
import { Field, ArgsType } from '@nestjs/graphql';

// Again, due to TypeScript's metadata reflection system limitations,
// it's required to either use the @Field decorator to manually indicate
// type and optionality, or use a CLI plugin.

@ArgsType()
export class GetAuthorArgs {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ defaultValue: '' })
  @MinLength(3)
  lastName: string;
}
