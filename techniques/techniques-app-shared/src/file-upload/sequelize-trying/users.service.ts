import { UploaderToS3Service } from './../services/uploaderToS3.service';
import { CreateUserDto, RemovePhotoDto } from './dtos.dto';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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

  async removePhoto(removePhotoDto: RemovePhotoDto) {
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

  findOneWithRelations(id: string): Promise<User> {
    return this.userModel.findOne({
      where: { id },
      include: [PublicFile],
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
