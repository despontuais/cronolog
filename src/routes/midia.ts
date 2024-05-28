import { Router } from 'express';
import * as MidiaController from '../controllers/midiaController';
import { privateRoute } from '../config/passport';

const router = Router();

router.post('/createMidia', privateRoute, MidiaController.createMidia);

export default router;