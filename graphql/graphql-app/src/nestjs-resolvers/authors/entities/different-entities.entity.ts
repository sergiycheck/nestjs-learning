import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
class Character {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;
}

@ObjectType()
class Warrior extends Character {
  @Field()
  level: number;
}
