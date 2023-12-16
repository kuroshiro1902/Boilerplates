import { Router } from 'express';
import authRouter from './auth.route';

const router = Router();
router.use('/users', authRouter);

export default router;
