import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { RoleEntity, UserEntity } from './entities/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  private getUserEntity() {
    return new UserEntity({
      userId: 1,
      username: 'username 1',
      firstname: 'firstname',
      surname: 'lastname',
      role: new RoleEntity({ name: 'writer' }),
      password: 'secret pass',
      _hidden1: 'hidden 1',
    });
  }

  //you must return an instance on the class.
  // If you return a plain js object, for example,
  // {user: new UserEntity() }, the obj won't be properly serialized

  //any method that returns a UserEntity will be sure to remove the password
  //property

  @SerializeOptions({
    excludePrefixes: ['_'],
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('user')
  findOne() {
    return this.getUserEntity();
  }

  //not working alone. You have to use UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    excludePrefixes: ['_'],
  })
  @Get('user-only-serialize-options')
  findOneUser1() {
    return this.getUserEntity();
  }
}
