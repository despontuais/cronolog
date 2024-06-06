import { Router } from 'express';
import { ping, getUser, listUsers } from '../controllers/users';
import authMiddleware from '../middlewares/auth';

const userRoutes:Router = Router();

userRoutes.get('/ping', ping);
userRoutes.get('/users/:id', getUser);
userRoutes.get('/users', authMiddleware, listUsers);

export default userRoutes;
