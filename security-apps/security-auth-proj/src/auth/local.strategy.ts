import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';

@Injectable() // PassportStrategy(Strategy, 'myjwt') //provide a name
export class LocalStrategy extends PassportStrategy(Strategy) {
  // dynamically resolve request-scoped providers within the strategy. we leverage the
  // module reference feature.

  constructor(
    // private authService: AuthService,
    private moduleRef: ModuleRef,
  ) {
    super({
      passReqToCallBack: true,
    });
  }

  // Passport automatically creates a user object, based on the value we return from the validate()
  // method, and assigns it to the Request object as req.user
  async validate(username: string, password: string, request: Request) {
    const contextId = ContextIdFactory.getByRequest(request);

    //resolve() with asynchronously return the request-scoped instance of
    //the AuthService provider (we assumed that AuthService is marked as a request-scoped provider)
    const authService = await this.moduleRef.resolve(AuthService, contextId);

    const user = await authService.validateUser(username, password);

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


// We can pass an options object in the call to super() to customize the behavior of the passport 
//strategy. In this example, the passport-local strategy by default expects properties 
//called username and password in the request body. Pass an options object to specify different 
//property names, for example: super({ usernameField: 'email' })
//passport docs
//http://www.passportjs.org/concepts/authentication/strategies/