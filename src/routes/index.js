import express from 'express';
import protectRoutesForNotAuth from '../middlewares/protectRoutesForNotAuth';
import usersRoutes from './users';
import moviesRoutes from './movies';
import authRoutes from './auth';
import errorsRoutes from './errorsRoutes';
import { SERVER_CRASH_TEST_ERROR } from '../utils/constants/ERROR_TEXTS';

const router = express.Router();

router.use('/crash-test', protectRoutesForNotAuth, () => {
  setTimeout(() => {
    throw new Error(SERVER_CRASH_TEST_ERROR);
  }, 0);
});

router.use('/', authRoutes);

router.use('/users', protectRoutesForNotAuth, usersRoutes);
router.use('/movies', protectRoutesForNotAuth, moviesRoutes);

router.use('*', protectRoutesForNotAuth, errorsRoutes);

export default router;
