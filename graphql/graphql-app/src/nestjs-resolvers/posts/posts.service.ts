import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';

type FindAllParams = {
  authorId?: number;
};

export const posts: Post[] = [
  {
    id: 1,
    title: 'post title 1',
    votes: 3,
    authorId: 1,
  },
  {
    id: 2,
    title: 'post title 2',
    votes: 5,
    authorId: 1,
  },
  {
    id: 3,
    title: 'post title 3',
    votes: 1,
    authorId: 2,
  },
];

@Injectable()
export class PostsService {
  create(createPostInput: CreatePostInput) {
    return 'This action adds a new post';
  }

  findAll(params?: FindAllParams) {
    if (params?.authorId)
      return posts.filter((p) => p.authorId === params.authorId);
    return posts;
  }

  findOne(id: number) {
    const p = posts.find((p) => p.id === id);
    if (!p) return new NotFoundException(`post with id ${id} was not found`);
    return p;
  }

  update(id: number, updatePostInput: UpdatePostInput) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }

  upvoteById({ id }: { id: number }) {
    const post = this.findOne(id) as Post;
    post.votes++;
    return post;
  }
}
