import { Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Cat, CatSchema } from './schemas/cat.schema';
import { CatService } from './cat.service';
import { CatController } from './cat.controller';

//a hardcoded catModel (object instance ) will be provided whenever any consumer injects a
// Model<Cat> using an @InjectModel() decorator

const catModel = {};

@Module({
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])],
  controllers: [CatController],
  providers: [
    CatService,
    { provide: getModelToken(Cat.name), useValue: catModel },
  ],
})
export class CatModule {}
