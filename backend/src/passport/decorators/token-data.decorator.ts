import {
  createParamDecorator,
  InternalServerErrorException,
} from '@nestjs/common';

import { TOKEN_PAYLOAD_KEY } from '../constants';

export const TokenData = createParamDecorator((data: string, req) => {
  const payload = req[TOKEN_PAYLOAD_KEY];
  if (data && typeof data !== 'string') {
    throw new InternalServerErrorException(
      "Wrong use of decorator 'TokenData'",
    );
  }
  return payload && data && typeof data === 'string' ? payload[data] : payload;
});
