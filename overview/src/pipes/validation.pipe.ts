import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

import { ObjectSchema } from 'joi';

@Injectable()
//PipeTransform<T, R>
// T to indicate the type of the input value
// R to indicate the return type of the transform() method
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  // a validation pipe either returns the value unchanged, or throws an
  // exception
  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}
