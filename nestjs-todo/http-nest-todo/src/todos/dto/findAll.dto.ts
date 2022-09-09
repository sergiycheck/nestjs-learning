import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class FindAllDto {
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
