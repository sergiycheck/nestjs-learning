import { Type } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

export function BaseResolver<T extends Type<unknown>>(classRef: T): any {
  // The isAbstract: true property indicates that SDL
  // (Schema Definition Language statements) shouldn't be generated for this class.
  @Resolver({ isAbstract: true })
  abstract class BaseResolverHost {
    @Query((type) => [classRef], { name: `findAll${classRef.name}` })
    async findAll(): Promise<T[]> {
      return [];
    }
  }
  return BaseResolverHost;
}
