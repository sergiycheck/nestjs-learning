import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  // Passport automatically creates a user object, based on the value we return from the validate()
  // method, and assigns it to the Request object as req.user
  async validate(username: string, password: string) {
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

//if a user is found and the credentials are valid, the user is returned so Password can complete its
//tasks (creating the user prop on the request object) and the request handling pipeline can continue
//if it's not found we throw an exception and let our exception layer handle it.

//validate() methods for each strategy deternine if a user exists and is valid
