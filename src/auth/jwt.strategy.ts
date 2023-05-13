import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from './payloads/jwt-payload';
import { JWT_CONFIG } from '../../src/configs/constants.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_CONFIG.SECRET,
      expiresIn: JWT_CONFIG.EXPIRED_IN,
    });
  }

  async validate(payload: any) {
    const result: JwtPayload = {
      sub: payload.id,
      email: payload.email,
      isAdministrator: payload.isSuperAdmin,
    };
    return result;
  }
}
