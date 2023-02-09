import mongoose from 'mongoose';
import { Expose } from 'class-transformer';
import { HideField } from '@nestjs/graphql';

export class BaseEntity {
  constructor(attrs: any) {
    Object.assign(this, attrs);
  }

  @HideField()
  @Expose({ name: 'id' })
  public _id: mongoose.Schema.Types.ObjectId;
}
