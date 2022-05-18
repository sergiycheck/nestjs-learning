import { ConfigModule } from '@nestjs/config';
import { FileUploadAppModule } from './../file-upload/file-upload.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot({ cache: true, expandVariables: true }), FileUploadAppModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
