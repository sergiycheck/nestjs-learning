import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBucketDto {
  @IsNotEmpty()
  name: string;
}

export class FileInfo {
  @IsNotEmpty()
  bucketName: string;

  @IsOptional()
  appendRadomIdAsAFileKey?: boolean;
}

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;

  @ApiProperty()
  bucketName: string;

  @ApiProperty()
  appendRadomIdAsAFileKey?: boolean;
}

export class PubBucketWebsiteDto {
  @IsNotEmpty()
  errorDocumentKey: string;

  @IsNotEmpty()
  indexDocumentSuffix: string;
}
