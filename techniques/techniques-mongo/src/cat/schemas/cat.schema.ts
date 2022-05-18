import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Owner } from '../../owner/schemas/owner.schema';

// https://www.npmjs.com/package/@nestjs/mongoose

// you can also generate a raw schema definition using the
// DefinitionsFactory class (from the nestjs/mongoose).
// This allows you to manually modify the schema definition

export type CatDocument = Cat & Document;

// the @Schema() decorator marks a class as a schema definition.
// It maps our Cat  class to a MongoDB collection of the same name,
// but with an additional 's' at the end  - so the final mongo collection name will be cats.
@Schema()
export class Cat {
  //The @Prop() decorator defines a property in the document.
  //the schema types for these properties are automatically inferred thanks to TypeScript metadata (and reflection ) capabilities.
  @Prop({ required: true })
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;

  @Prop([String])
  tags: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
  owner: Owner;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
