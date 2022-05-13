import { Injectable } from '@nestjs/common';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { Author } from './entities/author.entity';
import { posts } from '../posts/posts.service';

const authors: Author[] = [
  {
    id: 1,
    firstName: 'author1',
    lastName: 'authorLast1',
    posts: [posts[0], posts[1]],
  },
  {
    id: 2,
    firstName: 'author2',
    lastName: 'authorLast2',
    posts: [posts[2]],
  },
];

@Injectable()
export class AuthorsService {
  create(createAuthorInput: CreateAuthorInput) {
    const author: Author = {
      ...createAuthorInput,
      id: authors[authors.length - 1].id + 1,
      posts: [],
    };
    authors.push(author);
    return author;
  }

  findAll() {
    return authors;
  }

  findOne(id: number) {
    return authors.find((a) => a.id === id);
  }

  update(id: number, updateAuthorInput: UpdateAuthorInput) {
    let author = this.findOne(id);
    if (!author) return;
    author = {
      ...author,
      ...updateAuthorInput,
    };
    return author;
  }

  remove(id: number) {
    let author = this.findOne(id);
    if (!author) return;
    return authors.filter((a) => a.id !== id);
  }
}
