/*import { NextFunction, Request, Response } from 'express';
import { prisma } from "../libs/prisma";
import { JWT_SECRET } from "../secrets";
import * as jwt from 'jsonwebtoken';

// Estendendo a interface Request para incluir a propriedade user
interface AuthenticatedRequest extends Request {
    user?: any; // Pode ser um tipo mais específico se necessário
}

const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1] || req.cookies?.authToken;

    if (!token) {
        return res.status(401).json({ error: "Not Authorized" });
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET) as any;
        const user = await prisma.user.findFirst({ where: { id: payload.id } });
        if (!user) {
            return res.status(401).json({ error: "Not Authorized" });
        }
        req.user = user; // Definindo a propriedade user no objeto Request
        next();
    } catch (error) {
        return res.status(401).json({ error: "Not Authorized" });
    }
};

export default authMiddleware;
*/
