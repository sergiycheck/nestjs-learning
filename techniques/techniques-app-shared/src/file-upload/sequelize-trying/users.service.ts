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

  async create(data: CreateUserDto) {
    const user = await this.userModel.create({ ...data, id: uuidv4() });
    return user;
  }

  async addPhotos(userId: string, fileBuffer: Buffer, filename: string) {
    const user = await this.userModel.findByPk(userId);
    if (!user) throw new NotFoundException(`${userId} does not exist`);

    const photo = await this.fileUploaderToS3.uploadPublicFile(fileBuffer, filename, userId);
    if (!photo) throw new InternalServerErrorException({ message: 'photo is null' });

    const updatedRes = await this.findOneWithRelations(userId);
    return updatedRes;
  }

  async getOneRawPhotoOfUser(fileId: string) {
    const data = await this.fileUploaderToS3.getPrivateFile(fileId);
    return data;
  }

  async getUserWithRelationsAndPhotosLinks(userId: string) {
    const userWithRelations = await (await this.findOneWithRelations(userId)).toJSON();

    const mappedUserPhotos = await Promise.all(
      userWithRelations.photos.map(async (photo) => {
        const url = await this.fileUploaderToS3.getExpiredFileUrl(photo);
        return {
          ...photo,
          expiredUrl: url,
        };
      }),
    );

    const { photos, ...userData } = userWithRelations;

    return {
      ...userData,
      photos: mappedUserPhotos,
    };
  }

  async removePhoto(removePhotoDto: UserIdWithFileIdDto) {
    const { userId, fileId } = removePhotoDto;

    const deleteResultFromS3AndLocal = await this.fileUploaderToS3.deletePublicFile(fileId);
    const updatedUser = await this.findOneWithRelations(userId);

    return {
      deleteResult: deleteResultFromS3AndLocal,
      user: updatedUser,
    };
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll({ include: [PublicFile] });
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

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
