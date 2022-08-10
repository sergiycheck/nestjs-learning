import { Module } from '@nestjs/common';
import { AuthorsService } from './resolvers/authors.service';
import { AuthorsResolver } from './resolvers/decoupled-resolver.resolver';
import { PostsService } from './resolvers/posts.service';

@Module({
  providers: [AuthorsResolver, PostsService, AuthorsService],
})
export class AuthorPostsModule {}

//GraphQL argument decorators
//comparison of the nest decorators and the plain Apollo parameters they represent
// @Root() and @Parent()        root/parent
// @Context(param?: string)	    context / context[param]
// @Info(param?: string)	      info / info[param]
// @Args(param?: string)	      args / args[param]
