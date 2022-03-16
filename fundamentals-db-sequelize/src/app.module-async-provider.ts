import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule.register({ folder: './config' })],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const host = configService.get('HOST');
        const port = +configService.get('PORT');
        const username = configService.get('USERNAME');
        const password = configService.get('PASSWORD');
        const database = configService.get('DATABASE');

        return {
          dialect: 'postgres',
          host,
          port,
          username,
          password,
          database,
          autoLoadModels: true,
          synchronize: true,
        };
      },
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
