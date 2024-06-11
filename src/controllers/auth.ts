import { Request, Response } from "express";
import * as UserService from "../services/UserService";
import logger from "../libs/logger";
import { Prisma } from "@prisma/client";

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

//this type is being declared in "auth.ts" and "UserService.ts"
interface UserLoginInput {
  email?: string;
  username?: string;
  password: string;
}

export const register = async (req: Request, res: Response) => {
  const newUserParams: Prisma.UserCreateInput =
    req.body as Prisma.UserCreateInput;
  try {
    const newUser = await UserService.createUser(newUserParams);
    logger.info({ id: newUser.id });
    return res.status(201).json({ id: newUser.id });
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);
      return res.json({ error: error.message });
    }
  }
};

// implementação do login do Thiago, deixando para adicionar os cookies da forma correta
// export const login = async (req: Request, res: Response) => {
//     if (!req.body.email || !req.body.password) {
//         return res.status(401).json({ status: false });
//     }
//     try {
//         let email: string = req.body.email;
//         let password: string = req.body.password;
//         const user = await UserService.findByEmail(email);
//         if (user && await UserService.matchPassword(password, user.password)) {
//             const token = generateToken({ id: user.id });
//             res.cookie('authToken', token, {
//                 httpOnly: true,
//                 secure: process.env.NODE_ENV === 'production',
//                 maxAge: 3600000 // O cookie expira em 1 hora
//             });
//             return res.status(200).json({
//                 user: { id: user.id, username: user.username, email: user.email },
//                 status: true
//             });
//         }
//         return res.json({ status: false, error: 'E-mail e/ou senha inválidos.' });
//     } catch (error) {
//         const errorMessage = (error as Error).message || 'Erro desconhecido';
//         res.json({ status: false, error: errorMessage });
//     }
// };

export const login = async (req: Request, res: Response) => {
  const userParams: UserLoginInput = req.body as UserLoginInput;
  try {
    const user = await UserService.loginUser(userParams);
    const parsedResult = JSON.parse(user);
    return res.status(200).json(parsedResult);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);
      return res.json({ status: false, error: error.message });
    }
  }
};

export const me = (req: Request, res: Response) => {
  return res.json(req.user);
};

// rotas search e logout do thiago
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
};

export const logout = async (req: Request, res: Response) => {
    try {
        // Aqui, simplesmente enviamos uma resposta de sucesso.
        // Se você estiver armazenando tokens em um banco de dados, pode invalidá-los aqui.
        res.clearCookie('authToken'); // Supondo que você esteja usando cookies para armazenar o token
        return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: 'Logout failed', error: error.message });
        } else {
            return res.status(500).json({ message: 'Logout failed', error: 'Unknown error' });
        }
    }
};
