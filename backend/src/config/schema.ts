import Joi from '@hapi/joi';

export const SCHEMA: Joi.ObjectSchema = Joi.object({
  MONGO_URL: Joi.string().required(),
});
