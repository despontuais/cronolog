import { Router } from 'express';
import { login, register, me } from '../controllers/auth';
import authMiddleware from '../middlewares/auth';
import { privateRoute } from '../config/passport';

const authRoutes:Router = Router();

authRoutes.post('/register', register);
authRoutes.post('/login', login);
authRoutes.get('/me', privateRoute, me)

export default authRoutes;
