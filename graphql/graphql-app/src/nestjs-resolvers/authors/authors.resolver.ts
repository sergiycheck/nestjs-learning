import { Post } from './../posts/entities/post.entity';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { AuthorsService } from './authors.service';
import { Author } from './entities/author.entity';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { PostsService } from '../posts/posts.service';
import { GetAuthorArgs } from './dto/get-author.args';
import { UpvotePostInput } from '../posts/dto/update-post.input';

@Resolver(() => Author)
export class AuthorsResolver {
  constructor(
    private readonly authorsService: AuthorsService,
    private postsService: PostsService,
  ) {}

  @Query(() => [Author], { name: 'authors' })
  findAll() {
    return this.authorsService.findAll();
  }

  @Query(() => Author, { name: 'author' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.authorsService.findOne(id);
  }

  // @ResolveField()
  // async posts(@Parent() author: Author) {
  //   const { id } = author;
  //   return this.postsService.findAll({ authorId: id });
  // }

  // or

  @ResolveField('posts', (returns) => [Post])
  async getPosts(@Parent() author: Author) {
    const { id } = author;
    return this.postsService.findAll({ authorId: id });
  }

  // getAuthor(
  //   @Args('firstName', { nullable: true }) firstName?: string,
  //   @Args('lastName', { defaultValue: '' }) lastName?: string,
  // ) {
  //   return `gets author by ${firstName} and or ${lastName}`;
  // }

  // or

  getAuthor(@Args() args: GetAuthorArgs) {
    return `gets author by ${args?.firstName} and or ${args?.lastName}`;
  }

  @Mutation(() => Author)
  createAuthor(
    @Args('createAuthorInput') createAuthorInput: CreateAuthorInput,
  ) {
    return this.authorsService.create(createAuthorInput);
  }

  @Mutation(() => Author)
  updateAuthor(
    @Args('updateAuthorInput') updateAuthorInput: UpdateAuthorInput,
  ) {
    return this.authorsService.update(updateAuthorInput.id, updateAuthorInput);
  }

  @Mutation(() => Author)
  removeAuthor(@Args('id', { type: () => Int }) id: number) {
    return this.authorsService.remove(id);
  }

  // @Mutation((returns) => Post)
  // async upvotePost(@Args({ name: 'postId', type: () => Int }) postId: number) {
  //   return this.postsService.upvoteById({ id: postId });
  // }

  //or

  @Mutation((returns) => Post)
  async upvotePost(@Args('upvotePostData') upvotePostData: UpvotePostInput) {
    return this.postsService.upvoteById({ id: upvotePostData.postId });
  }
}
