import { UsersModule } from './../file-upload/sequelize-trying/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FileUploadAppModule } from './../file-upload/file-upload.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as Joi from 'joi';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeConfigService } from '../file-upload/sequelize-trying/sequelize-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      expandVariables: true,
      validationSchema: Joi.object({
        MULTER_DEST: Joi.string().required(),
        BUCKET_NAME: Joi.string().required(),
        IMAGES_PUBLIC_BUCKET: Joi.string().required(),
        IAM_USER_KEY_ID: Joi.string().required(),
        IAM_USER_SECRET_ACCESS_KEY: Joi.string().required(),
        //
        PG_DB_HOST: Joi.string().required(),
        PG_DB_PORT: Joi.number().required(),
        PG_DB_USERNAME: Joi.string().required(),
        PG_DB_PASSWORD: Joi.string().required(),
        PG_DB_DATABASE: Joi.string().required(),
      }),
    }),

    SequelizeModule.forRootAsync({
      // imports: [ConfigModule],
      // useFactory: (configService: ConfigService) => ({
      //   dialect: 'postgres',
      //   host: configService.get('PG_DB_HOST'),
      //   port: +configService.get('PG_DB_PORT'),
      //   username: configService.get('PG_DB_USERNAME'),
      //   password: configService.get('PG_DB_PASSWORD'),
      //   database: configService.get('PG_DB_DATABASE'),
      //   models: [],
      // }),
      // inject: [ConfigService],

      // or

      imports: [ConfigModule],
      useClass: SequelizeConfigService,
      inject: [ConfigService],
    }),
    FileUploadAppModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
