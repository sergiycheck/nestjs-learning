import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { PRIVATE_JWT_KEY } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const configObj = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: PRIVATE_JWT_KEY,
    };
    super(configObj);
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
