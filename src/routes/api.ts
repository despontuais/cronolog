import { Router } from 'express';
import { privateRoute } from '../config/passport';
import * as ApiController from '../controllers/apiController';

const router = Router();

router.get('/ping', privateRoute, ApiController.ping);
router.get('/users/:id', ApiController.getUser);

router.get('/users', ApiController.listUsers);

router.post('/register', ApiController.register);

router.post('/login', ApiController.login);

export default router;