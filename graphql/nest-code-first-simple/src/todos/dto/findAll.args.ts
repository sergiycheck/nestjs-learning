import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

@ArgsType()
export class FindAllArgs {
  @IsNumber()
  @Min(1)
  @Max(100)
  @Field(() => Int)
  page: number;

  @IsNumber()
  @Min(1)
  @Max(100)
  @Field(() => Int)
  limit: number;
}

@ArgsType()
export class GetPaginatedCursor {
  @IsNumber()
  @Min(1)
  @Max(100)
  @Field(() => Int)
  limit: number;

  @IsOptional()
  @IsString()
  previousPageCursor?: string;

  @IsOptional()
  @IsString()
  nextPageCursor?: string;
}
