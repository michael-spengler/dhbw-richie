import { Injectable, Request, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Connection } from 'typeorm';

import { TOKEN_PAYLOAD_KEY } from '../constants';
import { ConfigService } from '../../config';
import { User } from 'src/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly connection: Connection,
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(r: Request, payload: any) {
    const user = await this.connection.manager.findOne(User, payload._id);
    if (!user) {
      throw new UnauthorizedException();
    }
    r[TOKEN_PAYLOAD_KEY] = payload;
    return user;
  }
}
