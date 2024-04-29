import {Request, Response} from 'express';
import dotenv from 'dotenv';
import { prisma } from '../libs/prisma';
import { Prisma, User } from '@prisma/client';

dotenv.config();

export const ping = (req: Request, res: Response) => {
    res.json({pong: true});
}

export const register = async (req: Request, res: Response) => {
    if(!req.body.email || !req.body.password){
        return res.json({ error: 'E-mail e/ou senha não enviados.' });
    }
    try{
        let user: Prisma.UserCreateInput;
        let name: string = req.body.name;
        let email: string = req.body.email;
        let password: string = req.body.password;
        user = {
            name,
            email,
            password,
        }
        const hasUser: User | null = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if(hasUser){
            return res.json({error: "E-mail já cadastrado"});
        }
        let newUser = await prisma.user.create({data: user});
        return res.status(201).json({id: newUser.id});
    }catch(error){
        res.json({error});
    }
}
