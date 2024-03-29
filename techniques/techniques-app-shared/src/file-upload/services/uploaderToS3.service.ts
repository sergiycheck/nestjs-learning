import { InjectModel } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { getFileKeyFromFile, appendRandomIdWithHyphenToText } from '../file-upload.utils';
import { PublicFile } from '../entities/publicFile.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploaderToS3Service {
  private AWS_REGION: string;
  private BUCKET_NAME: string;
  private IMAGES_PUBLIC_BUCKET: string;

  private IAM_USER_KEY_ID: string;
  private IAM_USER_SECRET_ACCESS_KEY: string;
  private S3: AWS.S3;

  constructor(
    private configService: ConfigService,
    @InjectModel(PublicFile)
    private fileModel: typeof PublicFile,
  ) {
    this.AWS_REGION = this.configService.get('AWS_REGION');
    this.BUCKET_NAME = this.configService.get('BUCKET_NAME');
    this.IMAGES_PUBLIC_BUCKET = this.configService.get('IMAGES_PUBLIC_BUCKET');

    this.IAM_USER_KEY_ID = this.configService.get('IAM_USER_KEY_ID');
    this.IAM_USER_SECRET_ACCESS_KEY = this.configService.get('IAM_USER_SECRET_ACCESS_KEY');

    this.S3 = new AWS.S3({
      region: this.AWS_REGION,
      accessKeyId: this.IAM_USER_KEY_ID,
      secretAccessKey: this.IAM_USER_SECRET_ACCESS_KEY,
    });
  }

  putObjectToS3(file: Express.Multer.File) {
    return new Promise((resolve, reject) => {
      const params = { Body: file.buffer, Bucket: this.BUCKET_NAME, Key: getFileKeyFromFile(file) };

      this.S3.putObject(params, function (err, data) {
        if (err) {
          console.log(err);
          return reject(err);
        }
        console.log(data);
        return resolve(data);
      });
    });
  }

  async uploadPublicFile(dataBuffer: Buffer, filename: string, userId: string) {
    const params = {
      Body: dataBuffer,
      Bucket: this.IMAGES_PUBLIC_BUCKET,
      Key: appendRandomIdWithHyphenToText(filename),
    };

    const uploadResult = await this.S3.upload(params).promise();

    const newFile = this.fileModel.create({
      id: uuidv4(),
      url: uploadResult.Location,
      key: uploadResult.Key,
      bucket: uploadResult.Bucket,
      eTag: uploadResult.ETag,
      userId,
    });

    return newFile;
  }

  async uploadMultiplePublicFiles(files: Array<Express.Multer.File>, userId: string) {
    const uploadedResults = await Promise.all(
      files.map(async (file) => {
        const params = {
          Body: file.buffer,
          Bucket: this.IMAGES_PUBLIC_BUCKET,
          Key: appendRandomIdWithHyphenToText(file.originalname),
        };

        const uploadResult = await this.S3.upload(params).promise();

        return uploadResult;
      }),
    );

    const fileModelsToBulkCreate = uploadedResults.map((uploadResult) => ({
      id: uuidv4(),
      url: uploadResult.Location,
      key: uploadResult.Key,
      bucket: uploadResult.Bucket,
      eTag: uploadResult.ETag,
      userId,
    }));

    const newFiles = await this.fileModel.bulkCreate(fileModelsToBulkCreate);

    return newFiles;
  }

  private async getOneFile(fileId: string) {
    const file = await this.fileModel.findByPk(fileId);
    if (!file) throw new NotFoundException(`${fileId} does not exist`);
    return file;
  }

  public async getPrivateFile(fileId: string) {
    const file = await this.getOneFile(fileId);

    const params = {
      Bucket: file.bucket,
      Key: file.key,
    };

    const stream = this.S3.getObject(params).createReadStream();

    return {
      file,
      stream,
    };
  }

  public async getExpiredFileUrl(file: PublicFile) {
    const params = {
      Bucket: file.bucket,
      Key: file.key,
      Expires: 60 * 60, // 1-hour expiry time
    };
    return this.S3.getSignedUrlPromise('getObject', params);
  }

  async deletePublicFile(fileId: string) {
    const file = await this.getOneFile(fileId);

    const params = {
      Bucket: file.bucket,
      Key: file.key,
    };

    const deleteS3Res = await this.S3.deleteObject(params).promise();

    const deleteFromDbRes = await this.fileModel.destroy({ where: { id: file.id } });

    return { deleteS3Res, deleteFromDbRes };
  }
}
