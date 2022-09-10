import { CreatePostInput, Author } from './../../graphql';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AuthorsService } from './authors.service';
import { PostsService } from './posts.service';
import GetAuthorArgs from './dtos/get-author.args';

@Resolver('Author')
export class AuthorsResolver {
  constructor(
    private authorsService: AuthorsService,
    private postsService: PostsService,
  ) {}

  @Mutation()
  createPost(@Args('input') createPostInput: CreatePostInput) {
    console.log('createPostInput', createPostInput);
    return this.postsService.create(createPostInput);
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
  async getAuthorsByArgs(
    @Args() args: GetAuthorArgs, // TODO: args object is empty
    // @Args('firstName', { nullable: true }) firstName?: string,
    // @Args('lastName', { defaultValue: '' }) lastName?: string,
  ) {
    // const args: GetAuthorArgs = { firstName, lastName };
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
