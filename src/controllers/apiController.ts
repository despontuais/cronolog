import {Request, Response} from 'express';
import dotenv from 'dotenv';
import { prisma } from '../libs/prisma';
import { Prisma } from '@prisma/client';

dotenv.config();

export const ping = (req: Request, res: Response) => {
    res.json({pong: true});
}

