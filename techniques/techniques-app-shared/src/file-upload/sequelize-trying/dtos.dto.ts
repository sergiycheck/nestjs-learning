import { IsEmail, IsJWT, IsNotEmpty, IsString } from 'class-validator';

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
