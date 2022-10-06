import Joi from 'joi';

export const NewStudentValidationSchema = Joi.object().keys({
  name: Joi.string().required(),
  // lastName: Joi.string().required(),
  // email: Joi.string().email().required(),
  // photo: Joi.alternatives().try(Joi.string().uri().required()),
});
