import { Module } from '@nestjs/common';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Cat, CatSchema } from './schemas/cat.schema';
import { CatService } from './cat.service-with-connection';
import { CatController } from './cat.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }], 'cats'),
  ],
  controllers: [CatController],
  providers: [
    {
      provide: CatService,
      useFactory: (catConnection: Connection) => {
        return new CatService(catConnection);
      },
      inject: [getConnectionToken('cats')],
    },
  ],
})
export class CatModule {}
