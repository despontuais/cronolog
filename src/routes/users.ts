import { Router } from 'express';
import { ping, getUser, listUsers, getCurrentUser } from '../controllers/users';
import authMiddleware from '../middlewares/auth';
import { logout } from '../controllers/auth';

const userRoutes:Router = Router();

userRoutes.get('/ping', ping);
userRoutes.get('/users/:id', getUser);
userRoutes.get('/users', authMiddleware, listUsers);
userRoutes.get('/user', authMiddleware, getCurrentUser);
userRoutes.post('/logout', authMiddleware, logout)

export default userRoutes;
