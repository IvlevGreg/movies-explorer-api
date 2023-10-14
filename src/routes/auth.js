import express from 'express';
import { bruteforceAuth } from '../utils/bruteForce';
import protectRoutesForNotAuth from '../middlewares/protectRoutesForNotAuth';
import { createUser, login, logout } from '../controllers/auth';
import { signinValidate, signupValidate } from '../validation/auth';

const router = express.Router();

router.post('/signin', bruteforceAuth.prevent, signinValidate, login);
router.post('/sign-out', protectRoutesForNotAuth, logout);
router.post('/signup', bruteforceAuth.prevent, signupValidate, createUser);

export default router;
