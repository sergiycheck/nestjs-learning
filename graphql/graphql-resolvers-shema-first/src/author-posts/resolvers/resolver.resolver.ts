import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Author } from 'src/graphql';
import { AuthorsService } from './authors.service';
import { PostsService } from './posts.service';

@Resolver('Author')
export class AuthorsResolver {
  constructor(
    private authorsService: AuthorsService,
    private postsService: PostsService,
  ) {}

  @Query()
  async author(@Args('id') id: number) {
    return this.authorsService.findOneById(id);
  }

  @ResolveField()
  async posts(@Parent() author: Author) {
    const { id } = author;
    return this.postsService.findAllByAuthor({ authorId: id });
  }
}
