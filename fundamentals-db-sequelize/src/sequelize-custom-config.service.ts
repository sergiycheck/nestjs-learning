import { Injectable } from '@nestjs/common';
import { SequelizeOptionsFactory } from '@nestjs/sequelize';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { SequelizeOptions } from 'sequelize-typescript';

const defaultOptions = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'serhii_pass',
  database: 'nestjs-db1',
  autoLoadModels: true,
  synchronize: true,
} as Partial<SequelizeOptions>;

@Injectable()
export class SequelizeCustomConfigService implements SequelizeOptionsFactory {
  createSequelizeOptions(): SequelizeModuleOptions {
    return { ...defaultOptions };
  }
}
