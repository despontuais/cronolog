import { Router } from 'express';
import { login, register, me } from '../controllers/auth';
import authMiddleware from '../middlewares/auth';

const authRoutes:Router = Router();

authRoutes.post('/register', register);
authRoutes.post('/login', login);
authRoutes.get('/me', [authMiddleware], me)

export default authRoutes;
