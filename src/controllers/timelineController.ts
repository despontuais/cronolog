import { Request, Response } from 'express';
import { prisma } from '../libs/prisma';
import { Linha_do_tempo, Prisma, Usuario } from '@prisma/client';

export const createTimeline = async (req: Request, res: Response) => {
    const user = req.user as Usuario;
    if (!user) {
        return res.redirect('/');
    }

    const nome = req.body.name as string;

    if (!nome) {
        return res.status(400).json({ error: "O nome da timeline é obrigatório" });
    }

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
};

export const findByName = async (name: string) => {
    return await prisma.linha_do_tempo.findUnique({where: {Nome: name}});
}

export const timelineExists = async (name: string) => {
    const hasTimeline: Linha_do_tempo | null = await findByName(name);
    if (hasTimeline != null) {
        return true
    }
    return false
}

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
