import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private connection: Connection,
  ) {}

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOne(id);
  }

  async remove(id: number) {
    return this.usersRepository.delete(id);
  }

  //to test this class would require mocking the entire
  //connection object (which exposes several methods).
  // thus we recommended using a helper factory class QueryRunnerFactory
  //and defining an interface with a limited set of methods required to maintain transactions.
  //this technique makes mocking these methods pretty straightforward.
  async createMany(users: User[]) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const [firstUser, secondUser] = users;
      await queryRunner.manager.save(firstUser);
      await queryRunner.manager.save(secondUser);
      await queryRunner.commitTransaction();
    } catch (error) {
      //since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      //you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  create(createUserDto: CreateUserDto) {
    try {
      const result = this.usersRepository.save(createUserDto);
      return result;
    } catch (error) {
      return (
        'This action fails to add a new user' +
        `${JSON.stringify(createUserDto)} \n` +
        `${JSON.stringify(error)}`
      );
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const updateResult = this.usersRepository.update(id, updateUserDto);
      return updateResult;
    } catch (error) {
      return (
        `This action fails to update a #${id} user` +
        `${JSON.stringify(updateUserDto)} \n` +
        `${JSON.stringify(error)}`
      );
    }
  }
}
