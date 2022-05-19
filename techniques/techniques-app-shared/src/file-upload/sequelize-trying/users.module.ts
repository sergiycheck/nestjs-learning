import { FileUploadAppModule } from './../file-upload.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [SequelizeModule.forFeature([User]), FileUploadAppModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
