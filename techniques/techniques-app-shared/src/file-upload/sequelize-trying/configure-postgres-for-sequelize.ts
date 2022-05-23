import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('PG_DB_HOST'),
        port: +configService.get('PG_DB_PORT'),
        username: configService.get('PG_DB_USERNAME'),
        password: configService.get('PG_DB_PASSWORD'),
        database: configService.get('PG_DB_DATABASE'),
        models: [],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class ConfiguredAppModule {}
