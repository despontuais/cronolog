import { Usuario } from '@prisma/client';
import { Request, Response } from 'express'

export const createTimeline = async (req: Request, res: Response) => {
    const user = req.user as Usuario;
    if(!user){
        res.redirect('/');
    }
    const descricao = req.body.descricao as string;
    
    user.ID_Usuario;
    
    return res.json()
}

