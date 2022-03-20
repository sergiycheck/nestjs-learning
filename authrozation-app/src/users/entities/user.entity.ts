import { Role } from 'src/authorization/roles.enum';

export class User {
  public name: string;
  public roles: Role[];
}
