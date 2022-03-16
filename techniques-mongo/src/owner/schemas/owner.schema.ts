import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Cat } from '../../cat/schemas/cat.schema';

export type OwnerDocument = Owner & Document;

@Schema()
export class Owner {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cat' }] })
  cat: Cat[];
}

export const OwnerSchema = SchemaFactory.createForClass(Owner);
