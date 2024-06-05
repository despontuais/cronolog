import { Request, Response } from 'express';
import { generateToken } from '../config/passport';
import * as UserService from "../services/UserService"
import logger from "../libs/logger";

export const register = async (req: Request, res: Response) => {
    if (!req.body.email || !req.body.password) {
        return res.json({ error: 'E-mail e/ou senha não enviados.' });
    }
    try{
        const {email, password, name, birthDate} = req.body;
        const newUser = await UserService.createUser(email, password, name, birthDate);
        if(newUser instanceof Error){
            res.status(400).json({error: newUser.message});
            logger.error({error: newUser.message});
            return;
        }
        logger.info({id: newUser.id});
        return res.status(201).json({id: newUser.id});
    }catch(error){
        res.json({error});
        logger.error({error});
    }
    return;
}

export const login = async (req: Request, res: Response) => {
    if(!req.body.email || !req.body.password){
        return res.status(401).json({status: false});
    }
    try {
        const email: string = req.body.email;
        const password: string = req.body.password;
        const user = await UserService.findByEmail(email);
        if(user && await UserService.matchPassword(password, user.password)){
            const token = generateToken({id: user.id});
            return res.status(200).json({status: true, token});
        }
        return res.json({ status: false, error: 'E-mail e/ou senha inválidos.' });
    } catch (error) {
        const errorMessage = Error.arguments || 'Erro desconhecido';
        res.json({ status: false, error: errorMessage });
    }
    return;
}

export const me = async (req: Request, res: Response) => {
	res.json(req.user)
	return;
}
