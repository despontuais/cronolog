import express from 'express';
import { search } from '../controllers/searchController';
const router = express.Router();

// Aplica o middleware de autenticação à rota de busca
router.get('/', search);

export default router;
