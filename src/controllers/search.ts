import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const search = async (req: Request, res: Response) => {
    const query = req.query.q as string; // Supondo que a pesquisa seja baseada em um parâmetro de consulta chamado 'q'

    console.log('Recebido parâmetro de consulta:', query);

    if (!query) {
        console.error('Parâmetro de consulta ausente');
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        const results = await prisma.timeline.findMany({
            where: {
                OR: [
                    { description: { contains: query } },
                    { title: { contains: query } },
                    // Adicione mais campos para pesquisar aqui, se necessário
                ]
            },
        });

        console.log('Resultados da pesquisa:', results);
        
        res.status(200).json({ results });
    } catch (error) {
        console.error('Erro ao processar a pesquisa:', error);
        res.status(500).json({ error: 'Erro ao processar a pesquisa.' });
    }
};
