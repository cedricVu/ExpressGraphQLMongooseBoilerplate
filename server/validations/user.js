'use strict';
import Joi from 'joi';

const createSchema = Joi.object().keys({
  name: Joi
            .string()
            .alphanum()
            .min(3)
            .max(30)
            .required().error(() => '"foo" requires a positive number')
});

const updateSchema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().alphanum().min(3).max(30).required()
});

export default class UserValidation {

  static create(req, res, next) {
      const result = Joi.validate(req.body, createSchema, {abortEarly: false});
      if (result.error) {
        return next(result.error);
      }
      return next();
  };

  static update (req, res, next) {
    const result = Joi.validate(req.body, updateSchema);
    if (result.error) {
      return next(result.error);
    }
    return next();
  }

}
