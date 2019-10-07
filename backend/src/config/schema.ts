import Joi from '@hapi/joi';

export const SCHEMA: Joi.ObjectSchema = Joi.object({
  MONGO_URL: Joi.string().required(),
  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),
  GOOGLE_CALLBACK_URL: Joi.string().required()
});
