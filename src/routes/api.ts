import { Router } from 'express';
import * as ApiController from '../controllers/apiController';

const router = Router();

router.get('/ping', ApiController.ping);
router.get('/user/:id', ApiController.getUser);

router.get('/users', ApiController.listUsers);


router.post('/register', ApiController.register);

router.post('/login', ApiController.login);

export default router;