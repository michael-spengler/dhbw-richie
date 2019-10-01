import { Injectable, Request, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
// import { Connection } from 'typeorm';

import { TOKEN_PAYLOAD_KEY } from '../constants';
import { SECRET } from '../passport.module';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    // private readonly connection: Connection,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: SECRET,
      passReqToCallback: true,
    });
  }

  async validate(r: Request, payload: any) {
    // const user = await this.connection.manager.findOne(User, {
    //   where: {
    //     id: payload.userId,
    //   },
    // });
    // if (!user) {
    //   throw new UnauthorizedException();
    // }

    r[TOKEN_PAYLOAD_KEY] = payload;
    // return user;
  }
}
