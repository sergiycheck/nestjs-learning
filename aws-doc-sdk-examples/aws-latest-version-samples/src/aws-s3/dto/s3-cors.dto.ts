import {
  ArrayMaxSize,
  ArrayMinSize,
  IsNotEmpty,
  IsOptional,
  Validate,
} from 'class-validator';
import * as _ from 'lodash';

import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export type AllowedMethods = 'post' | 'get' | 'put' | 'patch' | 'delete' | 'head' | '*';
export const allowedMethodsArr: AllowedMethods[] = [
  'post',
  'get',
  'put',
  'patch',
  'delete',
  'head',
];

@ValidatorConstraint()
export class ArrayIntersectionValidator implements ValidatorConstraintInterface {
  validate(providedMethods: AllowedMethods[], validationArguments: ValidationArguments) {
    const intersectionRes = _.intersection(
      validationArguments.constraints,
      providedMethods,
    );
    return intersectionRes.length > 0;
  }
}

export class PutBucketCorsDto {
  @IsOptional()
  @IsNotEmpty()
  @Validate(ArrayIntersectionValidator, allowedMethodsArr, {
    message: 'Wrong method provided',
  })
  @ArrayMinSize(1)
  @ArrayMaxSize(allowedMethodsArr.length)
  methods: AllowedMethods[];
}
