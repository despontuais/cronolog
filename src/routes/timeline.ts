import { Router } from 'express';
import * as TimelineController from '../controllers/timelineController';
import { privateRoute } from '../config/passport';

const router = Router();

router.post('/timeline', privateRoute, TimelineController.createTimeline);

router.get('/timelines',privateRoute, TimelineController.getTimelines )

export default router;