import { Type } from '@nestjs/common';
import { ObjectType, Field } from '@nestjs/graphql';
import { Todo } from '../entities/todo.entity';

@ObjectType()
export class ResponseTodo extends Todo {
  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}

@ObjectType()
export class RemoveResponse {
  @Field()
  acknowledged: boolean;

  @Field()
  deletedCount: number;
}

interface IEdgeType<T> {
  cursor: string | null;
  node: T | null;
}

export interface IPaginatedType<T> {
  edges: IEdgeType<T>[];
  pageInfo: {
    startCursor: string;
    endCursor: string;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
  @ObjectType(`${classRef.name}Edge`)
  abstract class EdgeType {
    @Field(() => String)
    cursor: string | null;

    @Field(() => classRef)
    node: T | null;
  }

  @ObjectType(`${classRef.name}PageInfo`)
  abstract class PageInfoType {
    @Field(() => String)
    startCursor: string;

    @Field(() => String)
    endCursor: string;

    @Field(() => Boolean)
    hasPreviousPage: boolean;

    @Field(() => Boolean)
    hasNextPage: boolean;
  }

  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    @Field(() => [EdgeType], { nullable: true })
    edges: EdgeType[];

    @Field(() => PageInfoType, { nullable: false })
    pageInfo: PageInfoType;
  }
  return PaginatedType as Type<IPaginatedType<T>>;
}

@ObjectType()
export class PaginatedResponseTodo extends Paginated(ResponseTodo) {}
