import { Router } from 'express';
import * as ApiController from '../controllers/apiController';

const router = Router();

router.post('/ping', ApiController.ping);

router.post('/register', ApiController.register);


export default router;