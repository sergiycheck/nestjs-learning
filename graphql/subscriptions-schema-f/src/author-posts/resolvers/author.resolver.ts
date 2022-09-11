import {
  CreatePostInput,
  Author,
  UpdatePostInput,
  Post,
} from './../../graphql';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { AuthorsService } from './authors.service';
import { PostsService } from './posts.service';
import GetAuthorArgs from './dtos/get-author.args';
import redisPubSub from './subscription';
import { CREATED_POST_TOPIC } from './constants';

@Resolver('Author')
export class AuthorsResolver {
  constructor(
    private authorsService: AuthorsService,
    private postsService: PostsService,
  ) {}

  @Mutation()
  createPost(@Args('input') input: CreatePostInput) {
    const created = this.postsService.create(input);
    redisPubSub.publish(CREATED_POST_TOPIC, { created });
    return created;
  }

  @Subscription(() => Post)
  createdPost() {
    return redisPubSub.asyncIterator(CREATED_POST_TOPIC);
  }

  @Mutation()
  update(@Args('input') input: UpdatePostInput) {
    return this.postsService.update(input);
  }

  @Query('allPosts')
  async getAllPosts() {
    return this.postsService.findAll();
  }

  @Query('author')
  async getAuthor(@Args('id', { type: () => Int }) id: number) {
    return this.authorsService.findOneById(id);
  }

  @Query('getAuthorsByArgs')
  async getAuthorsByArgs(@Args() args: GetAuthorArgs) {
    return this.authorsService.getAuthorsByArgs(args);
  }

  @ResolveField('posts')
  async getPostsByAuthor(@Parent() author: Author) {
    const { id } = author;
    return this.postsService.findAllByAuthor({ authorId: id });
  }

  @Mutation()
  async upvotePost(@Args('postId') postId: number) {
    return this.postsService.upvoteById({ id: postId });
  }
}
