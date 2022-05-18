import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { UserSubscriber } from './user.subscriber';

@Module({
  //this module uses the forFeature() method to define which
  //repositories are registered in the current scope.
  //with that in place, we can inject the UsersRepository into
  //the UsersService using the @InjectRepository() decorator
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserSubscriber],

  //use the repository outside of the module
  exports: [TypeOrmModule],
})
export class UserModule {}
