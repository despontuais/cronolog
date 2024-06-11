import express from 'express';
import authMiddleware from '../middlewares/auth';
import { search } from '../controllers/searchController';
import { privateRoute } from '../config/passport';

const router = express.Router();

// Aplica o middleware de autenticação à rota de busca
router.get('/', search);

export default router;
