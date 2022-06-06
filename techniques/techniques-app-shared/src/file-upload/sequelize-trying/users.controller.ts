import { GoogleAuthToLocalService } from './google-auth-to-local/google-auth-to-local.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CreateUserDto, UpsertUserDto, UserIdWithFileIdDto, VerifyJwtTokenDto } from './dtos.dto';
import { UsersService } from './users.service';
import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
  UploadedFiles,
  Req,
  Session,
} from '@nestjs/common';
import { imageFileFilter, imageFileFilterIfFileExists } from './../file-upload.utils';
import { ErrorsInterceptor } from './error.interceptor';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

const maxFilesCountToUploadAtOnce = 10;

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
    private googleAuthToLocalService: GoogleAuthToLocalService,
  ) {}

  @Post()
  @UseInterceptors(
    ErrorsInterceptor,
    FilesInterceptor('file[]', maxFilesCountToUploadAtOnce, {
      fileFilter: imageFileFilterIfFileExists,
    }),
  )
  create(@Body() data: CreateUserDto, @UploadedFiles() files?: Array<Express.Multer.File>) {
    return this.usersService.createUserWithManyPhotos(data, files);
  }

  @Post(':userId/add-photos')
  @UseInterceptors(ErrorsInterceptor, FileInterceptor('file', { fileFilter: imageFileFilter }))
  async addPhotos(@Param('userId') userId: string, @UploadedFile() file: Express.Multer.File) {
    return this.usersService.addOnePhoto(userId, file.buffer, file.originalname);
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

  @Delete('logout')
  logOut(@Query('uId') userId: string, @Req() req: Request, @Res() res: Response) {
    req.user = undefined;
    req.session.destroy((err: any) => {
      return res.json({ message: 'successfully logged out', userId });
    });
  }

  @Get('current-session-user')
  getCurrentUser(@Req() req: Request, @Res() res: Response) {
    const { googleJwtToken, ...userData } = req.user;
    return res.status(200).json(userData);
  }

  @Post('verify-google-jwt-token')
  async verifyGoogleJwtToken(
    @Body() jwtGoogleTokenDto: VerifyJwtTokenDto,
    @Session() session: Record<string, any>,
  ) {
    const ticket = await this.googleAuthToLocalService.verifyIdToken(
      jwtGoogleTokenDto.jwtGoogleToken,
    );
    const payload = ticket.getPayload();

    const upsertParams: UpsertUserDto = {
      firstName: payload.given_name,
      lastName: payload.family_name,
      email: payload.email,
      pictureUrl: payload.picture,
      googleJwtToken: jwtGoogleTokenDto.jwtGoogleToken,
    };

    const user = await this.usersService.upsertUser(new UpsertUserDto({ ...upsertParams }));

    session.userId = user.id;

    return user;
  }
}
