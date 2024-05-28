import { Request, Response } from 'express';
import { prisma } from '../libs/prisma';
import { Linha_do_tempo, Prisma, Usuario } from '@prisma/client';

export const createTimeline = async (req: Request, res: Response) => {
    const user = req.user as Usuario;
    if (!user) {
        return res.redirect('/');
    }
    const nome = req.body.nome as string;
    try {
        const hasTimeline: Linha_do_tempo | null = await findByName(nome);
        if (hasTimeline) {
            return res.status(400).json({ error: "Essa timeline já existe" });
        }
        const data: Prisma.Linha_do_tempoCreateInput = {
            ID_Usuario: user.ID_Usuario,
            Nome: nome,
        };
        const newTimeline = await prisma.linha_do_tempo.create({ data });
        return res.status(201).json(newTimeline);
    } catch (error) {
        console.error('Erro ao criar timeline:', error);
        return res.status(500).json({ error: "Erro ao criar timeline" });
    }
};

export const findByName = async (name: string) => {
    return await prisma.linha_do_tempo.findUnique({ where: { Nome: name } });
};

export const getTimelines = async (req: Request, res: Response) => {
    const user = req.user as Usuario;
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const timelines = await prisma.linha_do_tempo.findMany({
        where: { ID_Usuario: user.ID_Usuario },
    });

    res.json(timelines);
};
