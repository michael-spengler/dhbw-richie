import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import { AuthService, Provider } from "../auth.service";
import { ConfigService } from "../../config";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

    constructor(
      private readonly authService: AuthService,
      private readonly configService: ConfigService
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

    async validate(request: any, accessToken: string, refreshToken: string, profile, done: any) {
      try {
        console.log('validate', profile);
        const jwt: string = await this.authService.validateOAuthLogin(profile.id, Provider.GOOGLE);
        const user = {
          jwt,
        };
        done(null, user);
      } catch (err) {
        console.log('validate', err);
        done(err, false);
      }
    }

}