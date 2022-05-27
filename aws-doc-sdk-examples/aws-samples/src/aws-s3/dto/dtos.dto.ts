import { IsNotEmpty } from 'class-validator';

export class CreateBucketDto {
  @IsNotEmpty()
  name: string;
}

export class FileInfo {
  @IsNotEmpty()
  bucketName: string;
}
