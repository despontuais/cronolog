import { Router } from 'express';
import * as TimelineController from '../controllers/timelineController';
import { privateRoute } from '../config/passport';

const router = Router();

router.post('/createTimeline', privateRoute, TimelineController.createTimeline);

export default router;