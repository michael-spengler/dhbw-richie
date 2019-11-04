import { createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const AuthenticatedUser = createParamDecorator((data: any, req: Request) =>
  getAuthenticatedUser(req)
);

export const getAuthenticatedUser = (req: Request) => {
  return req.user;
};
