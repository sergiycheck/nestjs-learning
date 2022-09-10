import { CreatePostInput, Post, UpdatePostInput } from './../../graphql';
import { Injectable, NotFoundException } from '@nestjs/common';

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
    const post: Post = {
      ...createPostInput,
      id: posts[posts.length - 1].id + 1,
      votes: 0,
    };
    posts.push(post);
    return post;
  }

  findAll() {
    return posts;
  }

  findAllByAuthor(params?: FindAllParams) {
    if (params?.authorId)
      return posts.filter((p) => p.authorId === params.authorId);
    return posts;
  }
  findOne(id: number) {
    const p = posts.find((p) => p.id === id);
    if (!p) throw new NotFoundException(`post with id ${id} was not found`);
    return p;
  }
  update(id: number, updatePostInput: UpdatePostInput) {
    const p = this.findOne(id);
    posts[p.id] = {
      ...p,
      ...updatePostInput,
    };

    return p[p.id];
  }
  remove(id: number) {
    const p = this.findOne(id);
    posts.splice(posts.indexOf(p), 1);
    return p;
  }
  upvoteById({ id }: { id: number }) {
    const post = this.findOne(id);
    post.votes++;
    return post;
  }
}
