import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeOptions } from 'sequelize-typescript';
import { UserModule } from './user/user.module';

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

@Module({
  imports: [
    SequelizeModule.forRoot({
      ...defaultOptions,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
