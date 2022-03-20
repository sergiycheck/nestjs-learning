import { Role } from 'src/authorization/roles.enum';

//Admins can manage (create/read/update/delete) all entities
// Users have read-only access to everything
// Users can update their articles (article.authourId === userId)
// articles that are published already cannot be removed (article.isPublished === true )
export class User {
  public userId: number;
  public username: string;
  public password: string;
  public isAdmin: boolean;
  public roles?: Role[];
}
