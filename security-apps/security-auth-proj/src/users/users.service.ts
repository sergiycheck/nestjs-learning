import { Injectable } from '@nestjs/common';

//TODO: use typeORM, Sequelize, Mongoose, etc

// this should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'Leanne',
      password: 'ewe323f2',
    },
    {
      userId: 2,
      username: 'Deckow',
      password: '3ini32f',
    },
  ];

  async findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
