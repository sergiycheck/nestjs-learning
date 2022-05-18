import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './schemas/cat.schema';
import { CatService } from './cat.service';
import { CatController } from './cat.controller';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Cat.name,
        imports: [ConfigModule.register({ folder: './config' })],
        useFactory: (configService: ConfigService) => {
          const schema = CatSchema;
          schema.pre('save', function () {
            console.log(
              ` ${configService.get('HELLO_MESSAGE')} ` +
                'cats.module-with-hooks message on pre save',
            );
          });

          return schema;
        },
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [CatController],
  providers: [CatService],
})
export class CatModule {}
