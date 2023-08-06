import { celebrate, Joi } from 'celebrate';

const validateEmailAndPasswordField = {
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8),
};

const usersFields = {
  name: Joi.string().min(2).max(30),
};

export const signinValidate = celebrate({
  body: Joi.object().keys({
    ...validateEmailAndPasswordField,
  }),
});

export const signupValidate = celebrate({
  body: Joi.object().keys({
    ...validateEmailAndPasswordField,
    ...usersFields,
  }),
});
