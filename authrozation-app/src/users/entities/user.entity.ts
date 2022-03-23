import { Role } from 'src/authorization/roles.enum';
import { BaseEntity } from 'src/base/entities/base-entities';

//Admins can manage (create/read/update/delete) all entities
// Users have read-only access to everything
// Users can update their articles (article.authourId === userId)
// articles that are published already cannot be removed (article.isPublished === true )
export class User extends BaseEntity {
  public userId: number;
  public username: string;
  public password: string;
  public isAdmin: boolean;
  public roles?: Role[];

  constructor(attrs: any) {
    super(attrs);
  }
}
