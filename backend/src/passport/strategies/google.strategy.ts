import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import { AuthService, Provider } from "../auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

    constructor(
      private readonly authService: AuthService,
      
    ) {
      super({
        clientID: '',
        clientSecret: '',
        callbackURL: 'http://localhost:3000/api/auth/google/callback',
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