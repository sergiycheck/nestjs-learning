import { ArgsType } from '@nestjs/graphql';
import { IsNumber, Max, Min } from 'class-validator';

@ArgsType()
export class FindAllArgs {
  @IsNumber()
  @Min(1)
  @Max(100)
  page: number;

  @IsNumber()
  @Min(1)
  @Max(100)
  limit: number;
}
