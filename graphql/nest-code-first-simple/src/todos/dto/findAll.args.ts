import { ArgsType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

@ArgsType()
export class FindAllArgs {
  constructor(attrs: any) {
    Object.assign(this, attrs);
  }
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(100)
  page: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(100)
  limit: number;
}
