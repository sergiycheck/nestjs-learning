import { UploaderToS3Service } from './../services/uploaderToS3.service';
import { CreateUserDto, UserIdWithFileIdDto } from './dtos.dto';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
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

  async create(data: CreateUserDto, uploadedFileData?: { fileBuffer: Buffer; filename: string }) {
    const user = await this.userModel.create({ ...data, id: uuidv4() });
    if (!uploadedFileData) return user;

    return this.addPhotos(user.id, uploadedFileData.fileBuffer, uploadedFileData.filename);
  }

  async addPhotos(userId: string, fileBuffer: Buffer, filename: string) {
    const user = await this.userModel.findByPk(userId);
    if (!user) throw new NotFoundException(`${userId} does not exist`);

    const photo = await this.fileUploaderToS3.uploadPublicFile(fileBuffer, filename, userId);
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

  findOne(id: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
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
}
