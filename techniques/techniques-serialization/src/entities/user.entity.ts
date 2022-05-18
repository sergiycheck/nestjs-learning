import { Exclude, Expose, Transform } from 'class-transformer';

class BaseEntity<T> {
  constructor(partial: Partial<T>) {
    Object.assign(this, partial);
  }
}

export class RoleEntity extends BaseEntity<RoleEntity> {
  name: string;

  constructor(partial: Partial<RoleEntity>) {
    super(partial);
  }
}

export class UserEntity extends BaseEntity<UserEntity> {
  public userId: number;
  public username: string;
  public firstname: string;
  public surname: string;

  public _hidden1: string;

  @Transform(({ value }) => value.name)
  role: RoleEntity;

  @Exclude()
  public password: string;

  @Expose()
  get fullName() {
    return `${this.firstname} ${this.surname}`;
  }

  constructor(partial: Partial<UserEntity>) {
    super(partial);
  }
}
