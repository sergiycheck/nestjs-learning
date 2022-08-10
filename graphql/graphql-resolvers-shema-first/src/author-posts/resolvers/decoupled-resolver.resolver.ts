import { Post, CreatePostInput } from './../../graphql';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AuthorsService } from './authors.service';
import { PostsService } from './posts.service';

@Resolver('Author')
export class AuthorsResolver {
  constructor(
    private authorsService: AuthorsService,
    private postsService: PostsService,
  ) {}

  // TODO: see the exact request graphql string
  @Mutation()
  createPost(@Args('input') createPostInput: CreatePostInput) {
    return this.postsService.create(createPostInput);
  }

  @Query('allPosts')
  async getAllPosts() {
    return this.postsService.findAll();
  }

  @Query('author')
  async getAuthor(@Args('id') id: number) {
    return this.authorsService.findOneById(id);
  }

  @ResolveField('posts')
  async getPostsByAuthor(@Parent() author) {
    const { id } = author;
    return this.postsService.findAllByAuthor({ authorId: id });
  }

  @Mutation()
  async upvotePost(@Args('postId') postId: number) {
    return this.postsService.upvoteById({ id: postId });
  }
}
