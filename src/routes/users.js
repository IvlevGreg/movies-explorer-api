import { celebrate, Joi } from 'celebrate';
import express from 'express';
import { updateUserById, getUserMe } from '../controllers/users';

const router = express.Router();

const validatePatchMe = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
});

router.get('/me', getUserMe);
router.patch('/me', validatePatchMe, updateUserById);

export default router;
