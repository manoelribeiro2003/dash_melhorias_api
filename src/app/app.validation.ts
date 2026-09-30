import * as Joi from 'joi';

//validações das variaveis do .env feitas em runtime

export const appValidationSchema = Joi.object({
  NODE_ENV: Joi.string().default('development'),
  DATABASE_TYPE: Joi.string().valid('postgres', 'sqlite').required(),
  DATABASE_HOST: Joi.string().allow('').optional(),
  DATABASE_PORT: Joi.number().integer().positive().optional(),
  DATABASE_USERNAME: Joi.string().allow('').optional(),
  DATABASE_DATABASE: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().allow('').optional(),
  DATABASE_AUTOLOADENTITIES: Joi.boolean().default(true),
  DATABASE_SYNCHRONIZE: Joi.boolean().default(false),
});
