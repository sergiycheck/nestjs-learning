import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDto, UserIdWithFileIdDto } from './dtos.dto';
import { UsersService } from './users.service';
import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { imageFileFilter } from './../file-upload.utils';
import { ErrorsInterceptor } from './error.interceptor';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() data: CreateUserDto) {
    return this.usersService.create(data);
  }

  @Post(':userId/add-photos')
  @UseInterceptors(ErrorsInterceptor, FileInterceptor('file', { fileFilter: imageFileFilter }))
  async addPhotos(@Param('userId') userId: string, @UploadedFile() file: Express.Multer.File) {
    return this.usersService.addPhotos(userId, file.buffer, file.originalname);
  }

  @Post('remove-photo')
  async removePhoto(@Body() removePhotoDto: UserIdWithFileIdDto) {
    return this.usersService.removePhoto(removePhotoDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('one')
  findOne(@Query('uId') userId: string) {
    return this.usersService.findOne(userId);
  }

  @Get('get-one-raw-photo/:fileId')
  async getOneRawPhotoOfUser(@Param('fileId') fileId: string, @Res() res: Response) {
    const file = await this.usersService.getOneRawPhotoOfUser(fileId);
    file.stream.pipe(res);
  }

  @Get('user-with-relations-and-photos-links/:userId')
  async getUserWithRelationsAndPhotosLins(@Param('userId') userId) {
    return this.usersService.getUserWithRelationsAndPhotosLinks(userId);
  }

  @Delete('one')
  deleteOne(@Query('uId') userId: string) {
    return this.usersService.remove(userId);
  }
}
