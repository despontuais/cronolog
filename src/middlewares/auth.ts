import { NextFunction, Request, Response } from 'express';
import { prisma } from "../libs/prisma";
import { JWT_SECRET } from "../secrets"
import * as jwt from 'jsonwebtoken'

const authMiddleware = async(req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.authorization!
	if(!token) {
		// implementar melhor a resposta com uma exception (vale para todos)
		res.status(401).json({error: "Not Authorized"})
	}
	try {
		const payload = jwt.verify(token, JWT_SECRET) as any
		const user = await prisma.user.findFirst({where: {id: payload.userID}})
		if(!user) {
			res.status(401).json({error: "Not Authorized"})
		}
		req.user = user as any
		next()
	}
	catch(error) {
		res.status(401).json({error: "Not Authorized"})
	}
}

export default authMiddleware
