import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { AuthService } from './auth.service';
import { ConfigModule } from 'src/config';

const EXPIRE_IN = "61m";
export const SECRET = "WoopThisIsASecret:D"

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: SECRET,
        signOptions: {
          expiresIn: EXPIRE_IN
        },
      }),
    }),
  ],
  exports: [JwtModule],
  providers: [LocalStrategy, JwtStrategy, GoogleStrategy, AuthService],
})
export class PassportModule {}
