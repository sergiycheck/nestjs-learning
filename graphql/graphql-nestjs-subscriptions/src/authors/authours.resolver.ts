import { AuthorsService } from './authors.service';
import { Resolver, Subscription, Query } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Author, Comment } from './entities/entities.entity';

const pubSub = new PubSub();

@Resolver((of) => Author)
export class AuthorResolver {
  constructor(private readonly authorsService: AuthorsService) {}

  @Query(() => [Author], { name: 'authors' })
  findAll() {
    return this.authorsService.findAll();
  }

  @Subscription((returns) => Comment)
  commentAdded() {
    return pubSub.asyncIterator('commentAdded');
  }
}
