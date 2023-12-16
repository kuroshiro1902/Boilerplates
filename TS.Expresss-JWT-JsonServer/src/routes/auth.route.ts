import { Router } from 'express';
import authController from '../controllers/Auth/auth.controller';

const authRouter = Router();

authRouter.post('/signup', (req, res) => authController.signup(req, res));

export default authRouter;
