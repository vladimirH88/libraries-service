import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Role } from '@entities/role.entity';

import { ExtractJwt, Strategy } from 'passport-jwt';

type JwtPayload = {
  sub: string;
  username: string;
  roles: Role[];
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_SECRET,
    });
  }

  async validate({ sub, username, roles }: JwtPayload) {
    return {
      id: sub,
      username,
      roles,
    };
  }
}
