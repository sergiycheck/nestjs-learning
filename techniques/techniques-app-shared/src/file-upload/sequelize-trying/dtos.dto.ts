import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';

export class BaseEntity {
  constructor(attrs: any) {
    Object.assign(this, attrs);
  }
}

export class CreateUserDto extends BaseEntity {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}

export class CreateUserApiDescription extends CreateUserDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  'file[]': any;
}

export class FindAllDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  //Enables automatic conversion between built-in types
  //based on type information provided by Typescript. Disabled by default.
  page?: number = 0;
}

export class AddPhotoToUserApiDescription {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

export class UpsertUserDto extends CreateUserDto {
  @IsNotEmpty()
  @IsString()
  pictureUrl: string;

  @IsNotEmpty()
  @IsString()
  googleJwtToken: string;
}

export class UserIdWithFileIdDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  fileId: string;
}

export class VerifyJwtTokenDto {
  @IsNotEmpty()
  @IsString()
  jwtGoogleToken: string;
}
