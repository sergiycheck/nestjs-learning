import { Module } from '@nestjs/common';
import { AuthorsService } from './resolvers/authors.service';
import { AuthorsResolver } from './resolvers/author.resolver';
import { PostsService } from './resolvers/posts.service';
import { REDIS_PUB_SUB } from './constants';
import redisPubSub from './subscription';

@Module({
  providers: [
    AuthorsResolver,
    PostsService,
    AuthorsService,
    { provide: REDIS_PUB_SUB, useValue: redisPubSub },
  ],
})
export class AuthorPostsModule {}

//GraphQL argument decorators
// @Root() and @Parent()        root/parent
// @Context(param?: string)	    context / context[param]
// @Info(param?: string)	      info / info[param]
// @Args(param?: string)	      args / args[param]
