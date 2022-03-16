import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createConnection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { PostModule } from './posts/post.module';
import { AuthorModule } from './authors/author.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.register({ folder: './config' })],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const host = configService.get('HOST');
        const port = +configService.get('PORT');
        const username = configService.get('USERNAME');
        const password = configService.get('PASSWORD');
        const database = configService.get('DATABASE');

        return {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database,
          entities: ['dist/**/*.entity{.ts,.js}'],
          synchronize: true,
        };
      },
      // connectionFactory receives the configured ConnectionOptions
      // and returns a Promise<Connection>
      connectionFactory: async (options) => {
        const connection = await createConnection(options);
        return connection;
      },
    }),

    UserModule,
    PostModule,
    AuthorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
