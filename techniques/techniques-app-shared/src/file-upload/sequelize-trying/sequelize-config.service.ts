import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions, SequelizeOptionsFactory } from '@nestjs/sequelize';

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {
  constructor(private configService: ConfigService) {}
  createSequelizeOptions(): SequelizeModuleOptions {
    return {
      dialect: 'postgres',
      host: this.configService.get('PG_DB_HOST'),
      port: +this.configService.get('PG_DB_PORT'),
      username: this.configService.get('PG_DB_USERNAME'),
      password: this.configService.get('PG_DB_PASSWORD'),
      database: this.configService.get('PG_DB_DATABASE'),
      // models: [User],
      //or

      autoLoadModels: true,
      // synchronize: true, //use migrations instead of synchronize
      retryAttempts: 1,
    };
  }
}
