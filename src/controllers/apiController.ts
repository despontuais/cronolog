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
        let {email, password, name, birthDate} = req.body;
        const newUser = await UserService.createUser(email, password, name, birthDate);
        if(newUser instanceof Error){
            res.status(400).json({error: newUser.message});
            logger.error({error: newUser.message});
            return;
        }
        logger.info({id: newUser.ID_Usuario});
        return res.status(201).json({id: newUser.ID_Usuario});
    }catch(error){
        res.json({error});
        logger.error({error});
    }
}

export const login = async (req: Request, res: Response) => {
    if(!req.body.email || !req.body.password){
        return res.status(401).json({status: false});
    }
    try{
        let email: string = req.body.email;
        let password: string = req.body.password;
        const user = await UserService.findByEmail(email);
        if(user && await UserService.matchPassword(password, user.Senha)){
            return res.status(200).json({status: true});
        }
        return res.json({status: false}); 
        
    }catch(error){
        res.json({error});
    }
}

export const getUser = async (req: Request, res: Response) => {
    let id = parseInt(req.params.id);
    const user = await UserService.findById(id);
    return res.status(200).json({test: user});
}

export const listUsers = async (req: Request, res: Response) => {
    const users = await UserService.findAll();
    return res.status(200).json({users});
}