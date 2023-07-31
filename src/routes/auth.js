const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { bruteforceAuth } = require('../utils/bruteForce');

const {
  createUser,
  login,
  logout,
} = require('../controllers/auth');

const validateEmailAndPasswordField = {
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8),
};

const usersFields = {
  name: Joi.string().min(2).max(30),
  // avatar: Joi.string().pattern(LINK_PATTERN),
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
router.post('/sign-out', logout);
router.post('/signup', bruteforceAuth.prevent, signupValidate, createUser);

module.exports = router;
