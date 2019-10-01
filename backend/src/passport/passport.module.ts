import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

const EXPIRE_IN = "61m";
export const SECRET = "WoopThisIsASecret:D"

@Module({
  imports: [
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
  providers: [LocalStrategy, JwtStrategy],
})
export class PassportModule {}
