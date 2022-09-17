import Joi from 'joi';

export const CreateStudentValidationSchema = {
  status: Joi.alternatives().try(
    Joi.number().integer().min(0).max(1),
    Joi.string()
      .lowercase()
      .trim()
      .pattern(/(^true$)|(^false^)/),
    Joi.boolean(),
  ),

  createdBy: Joi.alternatives().try(
    Joi.string().guid({
      version: ['uuidv4'],
    }),
  ),

  personalInformation: {
    name: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required().email(),
    photo: Joi.alternatives().try(Joi.string().required().uri()),
  },
};
