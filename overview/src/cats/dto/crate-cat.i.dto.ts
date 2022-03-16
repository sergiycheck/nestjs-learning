import * as Joi from 'joi';

export interface CreateCatDto {
  readonly name: string;

  readonly age: number;

  readonly breed: string;
}

export const CreateCatSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  age: Joi.number().min(0).max(100).required(),
  breed: Joi.string().min(3).max(150).required(),
});
