import { PrismaClient } from '@prisma/client';
import { Router, Request, Response } from 'express';
import logger from '../libs/logger';

const router = Router();
const prisma = new PrismaClient();

async function searchFromDatabase(query: string): Promise<string[]> {
    const results = await prisma.linha_do_tempo.findMany({
        where: {
            Descricao: {
                contains: query,
            }
        },
        select: {
            Descricao: true
        }
    });
    return results
        .filter(result => result.Descricao !== null)
        .map(result => result.Descricao!);
}
router.get('/search', async (req: Request, res: Response) => {
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

export default router;
export { searchFromDatabase };