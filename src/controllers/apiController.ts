import {Request, Response} from 'express';
import dotenv from 'dotenv';
import * as UserService from '../services/UserService';
import logger from '../libs/logger';

dotenv.config();

export const ping = (req: Request, res: Response) => {
    res.json({pong: true});
}

export const register = async (req: Request, res: Response) => {
    if(!req.body.email || !req.body.password){
        return res.json({ error: 'E-mail e/ou senha não enviados.' });
    }
    try{
        let {email, password, name} = req.body;
        const newUser = await UserService.createUser(email, password, name);
        if(newUser instanceof Error){
            res.json({error: newUser.message});
            logger.error({error: newUser.message});
            return;
        }
        logger.info({id: newUser.id});
        return res.status(201).json({id: newUser.id});
    }catch(error){
        res.json({error});
        logger.error({error});
    }
}

export const login = async (req: Request, res: Response) => {
    if(!req.body.email || !req.body.password){
        return res.json({ status: false});
    }
    try{
        let email: string = req.body.email;
        let password: string = req.body.password;
        const user = await UserService.findByEmail(email);

        if(user && await UserService.matchPassword(password, user.password)){
            return res.json({status: true});
        }
        return res.json({status: false});
        
    }catch(error){
        res.json({error});
    }
}