import { Injectable } from '@nestjs/common';
import { Author } from 'src/graphql';
import GetAuthorArgs from './dtos/get-author.args';
import { posts } from './posts.service';

export const authorsInMemory: Author[] = [
  {
    id: 1,
    firstName: 'first 1',
    lastName: 'last 1',
    posts: [posts[0], posts[1]],
  },
  {
    id: 2,
    firstName: 'name 2',
    lastName: 'last 2',
    posts: [posts[2]],
  },
];

@Injectable()
export class AuthorsService {
  findOneById(id: number) {
    return authorsInMemory.find((a) => a.id == id);
  }

  getAuthorsByArgs(args: GetAuthorArgs) {
    return authorsInMemory.filter(
      (a) =>
        a.firstName.startsWith(args.firstName) ||
        a.lastName.startsWith(args.lastName),
    );
  }
}
