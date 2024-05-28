import { Router } from 'express';
import * as TmdbController from '../controllers/tmdbController';

const router = Router();

router.get('/search', TmdbController.search);
router.get('/details', TmdbController.details);
router.get('/ping', TmdbController.ping);

export default router;