import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const search = async (req: Request, res: Response) => {
  const query = req.query.q as string;

  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required' });
  }

  try {
    const results = await prisma.timeline.findMany({
      where: {
        description: {
          contains: query, // Use 'contains' para busca parcial
        }
      }
    });

    res.json({ results });
  } catch (error) {
    console.error('Error during search:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
