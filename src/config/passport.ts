import passport from "passport";
import dotenv from "dotenv";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { findById } from "../services/UserService";
import { Request, Response, NextFunction } from 'express';
import { Usuario } from "@prisma/client";
import jwt from 'jsonwebtoken';


dotenv.config();


const notAuthorizedJson = {status: 401, message: 'Not Authorized'};

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string
}

passport.use(new JWTStrategy(options, async (payload, done) =>{
    const user = await findById(payload.id);
    if(!user){
        return done(notAuthorizedJson, false);
    }
    return done(null, user);
}));

export const generateToken = (data: object) => {
    return jwt.sign(data, process.env.JWT_SECRET as string);
}

export const privateRoute = (req: Request, res: Response, next: NextFunction) =>{
    const authFunction = passport.authenticate('jwt', (err: any, user: Usuario) => {
       req.user = user;
       return user ? next() : next(notAuthorizedJson);
    });
    authFunction(req, res, next);
}

export default passport;
