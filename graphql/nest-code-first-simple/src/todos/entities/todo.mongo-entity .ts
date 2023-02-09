import { BaseEntity } from 'src/common/entities/base-entities';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType } from '@nestjs/graphql';

@Schema({ timestamps: true, versionKey: false })
@ObjectType()
export class TodoModel extends BaseEntity {
  @Prop({ required: true, maxlength: 50 })
  name: string;

  @Prop({ required: true })
  isDone?: boolean;

  @Prop({ required: true, maxlength: 100 })
  tag?: string;
}

export type TodoDocument = TodoModel & Document;

export const TodoSchema = SchemaFactory.createForClass(TodoModel);
