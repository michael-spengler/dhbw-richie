import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { ConfigService } from '../../config';
import { Connection } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly configService: ConfigService,
    private readonly connection: Connection,
  ) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
      passReqToCallback: true,
      userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile,
    done: any,
  ) {
    try {
      const dbUser =
        (await this.connection.manager.findOne(User, {
          where: {
            googleId: profile._json.sub,
          },
        })) || new User();
      dbUser.email = profile._json.email;
      dbUser.familyName = profile._json.family_name;
      dbUser.givenName = profile._json.given_name;
      dbUser.picture = profile._json.picture;
      dbUser.googleId = profile._json.sub;
      await this.connection.manager.save(User, dbUser);
      done(null, dbUser);
    } catch (err) {
      console.log('validate', err);
      done(err, false);
    }
  }
}
