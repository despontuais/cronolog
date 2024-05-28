import { Router } from 'express';
import { privateRoute } from '../config/passport';
import { searchFromDatabase } from './searchRoutes';
import * as ApiController from '../controllers/apiController';
import logger from '../libs/logger';
import path from 'path'

const router = Router();

router.get('/ping', ApiController.ping);
router.get('/users/:id', ApiController.getUser);

router.get('/users', privateRoute, ApiController.listUsers);

router.get('/api/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/login.html'));
});

router.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/about.html'));
});

router.get('/search', async (req, res) => {
    const query = req.query.q as string;
    if (!query) {
        return res.status(400).send({ error: 'Query parameter is required' });
    }

    try {
        const resultados = await searchFromDatabase(query);
        return res.status(200).send(resultados);
    } catch (error) {
        logger.error('Error handling search request:', error);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
});

router.post('/register', ApiController.register);

router.post('/search', ApiController.search);

router.post('/api/login', ApiController.login);

export default router;
