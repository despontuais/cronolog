import { Request, Response } from 'express';
import dotenv from 'dotenv';
import * as UserService from '../services/UserService';
import logger from '../libs/logger';
import path from 'path';

dotenv.config();

export const ping = (req: Request, res: Response) => {
    res.json({ pong: true });
}

export const register = async (req: Request, res: Response) => {
    if (!req.body.email || !req.body.password) {
        return res.json({ error: 'E-mail e/ou senha não enviados.' });
    }
    try {
        let { email, password, name } = req.body;
        const newUser = await UserService.createUser(email, password, name);
        if (newUser instanceof Error) {
            const errorMessage = newUser.message;
            res.json({ error: errorMessage });
            logger.error({ error: errorMessage });
            return;
        }
        logger.info({ id: newUser.id });
        return res.status(201).json({ id: newUser.id });
    } catch (error) {
        const errorMessage = Error.arguments|| 'Erro desconhecido';
        res.json({ error: errorMessage });
        logger.error({ error: errorMessage });
    }
}

export const login = async (req: Request, res: Response) => {
    if (!req.body.email || !req.body.password) {
        return res.json({ status: false, error: 'E-mail e/ou senha não enviados.' });
    }
    try {
        let email: string = req.body.email;
        let password: string = req.body.password;
        const user = await UserService.findByEmail(email);

        if (user && await UserService.matchPassword(password, user.password)) {
            return res.status(200).json({ status: true });
        }
        return res.json({ status: false, error: 'E-mail e/ou senha inválidos.' });

    } catch (error) {
        const errorMessage = Error.arguments || 'Erro desconhecido';
        res.json({ status: false, error: errorMessage });
    }
}

export const getUser = async (req: Request, res: Response) => {
    let id = parseInt(req.params.id);
    const user = await UserService.findById(id);
    return res.status(200).json({ test: user });
}

export const listUsers = async (req: Request, res: Response) => {
    const users = await UserService.findAll();
    return res.status(200).json({ users });
}

export const search = async (req: Request, res: Response) => {
    // Lógica para lidar com a pesquisa aqui
    const query = req.query.q; // Supondo que a pesquisa seja baseada em um parâmetro de consulta chamado 'q'
    
    try {
        // Faça sua lógica de pesquisa aqui com base na query
        
        // Exemplo simples: apenas retornar a consulta de volta
        res.status(200).json({ query });
    } catch (error) {
        // Em caso de erro, retorne uma resposta de erro
        res.status(500).json({ error: 'Erro ao processar a pesquisa.' });
    }
}

