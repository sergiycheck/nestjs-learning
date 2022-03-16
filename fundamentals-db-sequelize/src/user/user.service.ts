import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { CreateUserDto } from './models/create-user.dto';
import { Sequelize } from 'sequelize-typescript';
import { UpdateUserDto } from './models/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private sequelize: Sequelize,
  ) {}

  async findAll() {
    return this.userModel.findAll();
  }

  findOne(id: number) {
    return this.userModel.findOne({ where: { id } });
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    try {
      await user.destroy();
      return `user with ${id} was successfully destroyed`;
    } catch (error) {
      return error;
    }
  }

  create(createUserDto: Partial<CreateUserDto>) {
    const res = this.userModel.create(createUserDto);
    return res;
  }

  // to test this class would require mocking the entire Sequelize object
  // recommended to use helper factory class TransactionRunner and define
  // interface with a limited set of methods required to maintain transactions
  async createManyExampleTransaction() {
    try {
      await this.sequelize.transaction(async (t) => {
        const transactionHost = { transaction: t };

        await this.userModel.create(
          {
            firstName: 'Leanne',
            lastName: 'Graham',
          },
          transactionHost,
        );

        await this.userModel.create(
          {
            firstName: 'Romaguera',
            lastName: 'Crona',
          },
          transactionHost,
        );
      });
    } catch (error) {
      return error;
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return 'updates updateUserDto';
    } catch (error) {
      return (
        `This action fails to update a #${id} user` +
        `${JSON.stringify(updateUserDto)} \n` +
        `${JSON.stringify(error)}`
      );
    }
  }
}
