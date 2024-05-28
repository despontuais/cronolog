import { Midia, Prisma, Usuario } from '@prisma/client';
import { Request, Response } from 'express'
import { prisma } from '../libs/prisma';
import * as tmdb from './tmdbController';
import { JsonArray } from '@prisma/client/runtime/library';
import { timelineExists, findByName } from './timelineController';

export const createMidia = async (req: Request, res: Response) => {
    const user = req.user as Usuario;
    if(!user){
        res.redirect('/');
    }
    const timelineName = req.body.timelineName
    if(await !timelineExists(timelineName)) {
        res.json(404).json({"error": "A timeline em questão não existe"})
    }
    const timelineID = await findByName(timelineName)
    const movies = await tmdb.searchByQuery(req.query.name as string)
    const movie = JSON.parse(movies as string)
    const data: Prisma.MidiaCreateInput = {
        ID_API: movie[0].id as number,
        ID_LinhaTempo: timelineID?.ID_LinhaTempo as number,
        Titulo: movie[0].title as string,
    }

    const newMidia = await prisma.midia.create({data})
    return res.status(201).json(newMidia);
}