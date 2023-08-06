import express from 'express';
import { handle404Errors } from '../controllers/handle404Errors';

const router = express.Router();

router.all('*', handle404Errors);

export default router;
