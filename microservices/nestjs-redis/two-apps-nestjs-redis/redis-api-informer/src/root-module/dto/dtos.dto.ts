import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
// when using validation pipe configured like in main.ts
//Validation decorators are mandatory to populate
//dtos properties
export class SendGetMsgDto {
  @IsNotEmpty()
  @IsString()
  msg: string;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  bookName: string;
  @IsNotEmpty()
  @IsString()
  author: string;
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}

export class NumberDto {
  @IsNotEmpty()
  @IsNumber()
  item: number;
}
