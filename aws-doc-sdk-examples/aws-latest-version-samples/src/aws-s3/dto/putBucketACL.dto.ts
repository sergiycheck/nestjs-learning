import { ArrayMinSize, IsIn, IsNotEmpty } from 'class-validator';

export class Grantee {
  @IsNotEmpty()
  @IsIn(['CanonicalUser', 'AmazonCustomerByEmail', 'Group'])
  Type: 'CanonicalUser' | 'AmazonCustomerByEmail' | 'Group';
  @IsNotEmpty()
  ID: string;
}

export class Grant {
  @IsNotEmpty()
  Grantee: Grantee;
  @IsNotEmpty()
  @IsIn(['FULL_CONTROL', 'WRITE', 'WRITE_ACP', 'READ', 'READ_ACP'])
  Permission: 'FULL_CONTROL' | 'WRITE' | 'WRITE_ACP' | 'READ' | 'READ_ACP';
  //...
}

export class Owner {
  @IsNotEmpty()
  ID: string;
  //..
}

export class AccessControlPolicy {
  @IsNotEmpty()
  @ArrayMinSize(1)
  Grants: Grant[];

  Owner: Owner;

  //...
}

export class PutBucketAclDto {
  @IsNotEmpty()
  AccessControlPolicy: AccessControlPolicy;

  //...
}
