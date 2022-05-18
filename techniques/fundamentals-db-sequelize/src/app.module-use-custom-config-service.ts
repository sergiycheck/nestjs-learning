import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SequelizeCustomConfigService } from './sequelize-custom-config.service';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useClass: SequelizeCustomConfigService,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
