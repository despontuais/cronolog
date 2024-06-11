import { Request, Response } from 'express';
import * as UserService from '../services/UserService';

export const ping = async (req: Request, res: Response) => {
    res.json({ pong: true });
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

export const getCurrentUser = (req: Request, res: Response) => {
    // Assumindo que o middleware de autenticação adiciona o usuário ao objeto de solicitação (req.user)
    const user = req.user;
    if (user) {
        res.json({ user });
    } else {
        res.status(404).json({ error: 'Usuário não encontrado' });
    }
};