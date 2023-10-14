import express from 'express';
import { updateUserById, getUserMe } from '../controllers/users';
import { validatePatchMe } from '../validation/users';

const router = express.Router();

router.get('/me', getUserMe);
router.patch('/me', validatePatchMe, updateUserById);

export default router;
