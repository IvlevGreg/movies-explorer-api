import { celebrate, Joi } from 'celebrate';
import express from 'express';
import { bruteforceAuth } from '../utils/bruteForce';
import protectRoutesForNotAuth from '../middlewares/protectRoutesForNotAuth';
import { createUser, login, logout } from '../controllers/auth';

const router = express.Router();

const validateEmailAndPasswordField = {
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8),
};

const usersFields = {
  name: Joi.string().min(2).max(30),
};

const signinValidate = celebrate({
  body: Joi.object().keys({
    ...validateEmailAndPasswordField,
  }),
});

const signupValidate = celebrate({
  body: Joi.object().keys({
    ...validateEmailAndPasswordField,
    ...usersFields,
  }),
});

router.post('/signin', bruteforceAuth.prevent, signinValidate, login);
router.post('/sign-out', protectRoutesForNotAuth, logout);
router.post('/signup', bruteforceAuth.prevent, signupValidate, createUser);

export default router;
