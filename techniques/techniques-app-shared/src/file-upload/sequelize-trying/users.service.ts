import { UploaderToS3Service } from './../services/uploaderToS3.service';
import { CreateUserDto, UserIdWithFileIdDto, UpsertUserDto } from './dtos.dto';
import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { v4 as uuidv4 } from 'uuid';
import { PublicFile } from '../entities/publicFile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private fileUploaderToS3: UploaderToS3Service,
  ) {}

  async create(data: CreateUserDto, file?: Express.Multer.File) {
    const emailCount = await this.userModel.count({ where: { email: data.email } });
    if (emailCount) {
      throw new ForbiddenException(`user with email ${data.email} already exists`);
    }

    const user = await this.userModel.create({ ...data, id: uuidv4() });
    if (!file) return user;

    return this.addOnePhoto(user.id, file.buffer, file.originalname);
  }

  async createUserWithManyPhotos(data: CreateUserDto, files?: Array<Express.Multer.File>) {
    const user = await this.userModel.create({ ...data, id: uuidv4() });
    if (!files?.length) return user;
    return this.addManyPhotos(user.id, files);
  }

  async addManyPhotos(userId: string, files: Array<Express.Multer.File>) {
    const user = await this.findOne(userId);
    await this.fileUploaderToS3.uploadMultiplePublicFiles(files, user.id);

    return this.getUserWithRelationsAndPhotosLinks(userId);
  }

  async addOnePhoto(userId: string, fileBuffer: Buffer, filename: string) {
    const user = await this.findOne(userId);

    const photo = await this.fileUploaderToS3.uploadPublicFile(fileBuffer, filename, user.id);
    if (!photo) throw new InternalServerErrorException({ message: 'photo is null' });

    return this.getUserWithRelationsAndPhotosLinks(userId);
  }

  async getOneRawPhotoOfUser(fileId: string) {
    const data = await this.fileUploaderToS3.getPrivateFile(fileId);
    return data;
  }

  async getUserWithRelationsAndPhotosLinks(userId: string) {
    const userWithRelations = await (await this.findOneWithRelations(userId)).toJSON();

    return this.mapPopulateUserWithPhotos(userWithRelations);
  }

  private async mapPopulateUserWithPhotos(user: User) {
    const mappedUserPhotos = await Promise.all(
      user.photos.map(async (photo) => {
        const url = await this.fileUploaderToS3.getExpiredFileUrl(photo);
        return {
          ...photo,
          expiredUrl: url,
        };
      }),
    );

    const { photos, ...userData } = user;

    return {
      ...userData,
      photos: mappedUserPhotos,
    };
  }

  async removePhoto(removePhotoDto: UserIdWithFileIdDto) {
    const { userId, fileId } = removePhotoDto;

    const deleteResultFromS3AndLocal = await this.fileUploaderToS3.deletePublicFile(fileId);
    const updatedUser = await this.getUserWithRelationsAndPhotosLinks(userId);

    return {
      deleteResult: deleteResultFromS3AndLocal,
      user: updatedUser,
    };
  }

  async findAll() {
    const allUsers = await this.userModel.findAll({ include: [PublicFile] });

    return Promise.all(
      allUsers.map(async (user) => await this.mapPopulateUserWithPhotos(user.toJSON())),
    );
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) throw new NotFoundException(`${id} does not exist`);
    return user;
  }

  async findOneWithRelations(id: string): Promise<User> {
    const userWithData = await this.userModel.findOne({
      where: { id },
      include: [PublicFile],
    });
    if (!userWithData) throw new NotFoundException('user was not found');

    return userWithData;
  }

  async remove(id: string) {
    const user = await this.findOneWithRelations(id);
    const resDelFromS3 = await Promise.all(
      user.photos.map(async (photo) => await this.fileUploaderToS3.deletePublicFile(photo.id)),
    );
    const resDelFromDb = await this.userModel.destroy({ where: { id } });
    return {
      resDelFromS3,
      resDelFromDb,
    };
  }

  getPojo(entity: unknown) {
    return JSON.parse(JSON.stringify(entity));
  }

  async upsertUser(upsertUserDto: UpsertUserDto): Promise<Omit<User, 'googleJwtToken'>> {
    let upsertResult;
    const userFromDb = await this.userModel.findOne({ where: { email: upsertUserDto.email } });
    if (userFromDb) {
      upsertResult = await this.userModel.upsert({ ...upsertUserDto, id: userFromDb.id });
    } else {
      upsertResult = await this.userModel.upsert({ ...upsertUserDto, id: uuidv4() });
    }

    let [user] = upsertResult;
    user = this.getPojo(user);

    const { googleJwtToken, ...userData } = user;

    return userData;
  }
}
