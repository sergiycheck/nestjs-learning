import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class CatService {
  constructor(@InjectConnection('cats') private connection: Connection) {}
}
