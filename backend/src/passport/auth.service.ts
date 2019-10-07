import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { SECRET } from './passport.module';

export enum Provider {
  GOOGLE = 'google',
}

@Injectable()
export class AuthService {
    async validateOAuthLogin(thirdPartyId: string, provider: Provider): Promise<string> {
        try {
          return sign({
            thirdPartyId,
            provider,
          }, SECRET, {
            expiresIn: 3600,
          });
        } catch (err) {
          throw new InternalServerErrorException('validateOAuthLogin', err.message);
        }
    }
}