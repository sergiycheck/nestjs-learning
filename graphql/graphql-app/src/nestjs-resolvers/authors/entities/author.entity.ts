import { BaseEntity } from './../../base.entitty';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from '../../posts/entities/post.entity';
import { Paginated } from '../../generics/cursor-based-pagination';

@ObjectType()
export class Author extends BaseEntity {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field((type) => [Post], { nullable: 'items' })
  posts: Post[];
}

@ObjectType()
export class PaginatedAuthor extends Paginated(Author) {}
