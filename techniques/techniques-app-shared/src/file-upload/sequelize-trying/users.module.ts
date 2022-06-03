import { ConfigModule } from '@nestjs/config';
import { FileUploadAppModule } from './../file-upload.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [SequelizeModule.forFeature([User]), FileUploadAppModule, ConfigModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
