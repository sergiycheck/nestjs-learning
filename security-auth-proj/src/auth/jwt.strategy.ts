import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

//protecting endpoints by requiring a valid JWT be present on the request
//passport-jwt strategy for securing RESTful endpoints with JSON Web Tokens.
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  //configure strategy
  //https://github.com/mikenicholson/passport-jwt#configure-strategy
  constructor(private configService: ConfigService) {
    const configObj = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('PRIVATE_JWT_KEY'),
    };
    super(configObj);
  }

  async validate(payload: any) {
    //we can inject other business logic here
    //do a database lookup and extract more info about user,
    //resulting in a more enriched user object being available in our Request
    //do a further token validation, such as lookig up the userId in a list of
    //revoked tokens, token revocation
    return { userId: payload.sub, username: payload.username };
  }
}
