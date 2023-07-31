const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  updateUserById,
  getUserMe,
} = require('../controllers/users');

const validatePatchMe = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
  }),
});

router.get('/me', getUserMe);
router.patch('/me', validatePatchMe, updateUserById);

module.exports = router;
