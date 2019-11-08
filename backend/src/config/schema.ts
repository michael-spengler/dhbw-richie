import Joi from '@hapi/joi';

export const SCHEMA: Joi.ObjectSchema = Joi.object({
  MONGO_URL: Joi.string().required(),
  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),
  GOOGLE_CALLBACK_URL: Joi.string().required(),

  FRONTEND_CALLBACK: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().default('60m'),
  JWT_SECRET: Joi.string().required(),
  ELASTIC_URL: Joi.string().required(),
  TG_TOKEN: Joi.string().required()
});
