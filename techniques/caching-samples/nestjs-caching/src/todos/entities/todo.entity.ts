import { BaseEntity } from './../../entities/base-entities';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Todo extends BaseEntity {
  @Prop({ required: true, maxlength: 20 })
  name: string;

  @Prop({ required: true, maxlength: 100 })
  description: string;

  @Prop({ required: true })
  completed: boolean;
}

export type TodoDocument = Todo & Document;

export const TodoSchema = SchemaFactory.createForClass(Todo);
