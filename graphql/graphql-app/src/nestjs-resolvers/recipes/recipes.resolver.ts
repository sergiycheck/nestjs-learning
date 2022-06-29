import { Injectable } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { BaseResolver } from '../shared/generic.resolver';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class Recipe {
  @Field((type) => String)
  name: string;
}

@Injectable()
class RecipesService {}

@Resolver((of) => Recipe)
export class RecipesResolver extends BaseResolver(Recipe) {
  constructor(private recipesService: RecipesService) {
    super();
  }
}
