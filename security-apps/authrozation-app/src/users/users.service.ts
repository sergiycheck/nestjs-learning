import { Injectable } from '@nestjs/common';
import { Role } from 'src/authorization/roles.enum';
import { User } from './entities/user.entity';

//TODO: use typeORM, Sequelize, Mongoose, etc

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userId: 1,
      username: 'Leanne',
      password: 'ewe323f2',
      isAdmin: false,
    },
    {
      userId: 2,
      username: 'Deckow',
      password: '3ini32f',
      isAdmin: false,
    },
    {
      userId: 3,
      username: 'admin1',
      password: 'f32r_admin_23red',
      isAdmin: true,
      roles: [Role.Admin],
    },
  ];

  async findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
