import { createParamDecorator } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';

export const Token = createParamDecorator((data, req) => {
  return ExtractJwt.fromAuthHeaderAsBearerToken()(req);
});
