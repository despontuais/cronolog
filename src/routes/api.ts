import { Router } from 'express';
import * as ApiController from '../controllers/apiController';

const router = Router();

router.post('/ping', ApiController.ping);

export default router;