import passport from "passport";
import { JWT_SECRET } from "../secrets"
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { findById } from "../services/UserService";
import { Request, Response, NextFunction } from 'express';
import { User } from "@prisma/client";
import jwt from 'jsonwebtoken';

const notAuthorizedJson = {status: 401, message: 'Not Authorized'};

const options = {
    // substituí o bearer por um header "Authorization" na request
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET,
    ignoreExpiration: false
}

passport.use(new JWTStrategy(options, async (payload, done) =>{
    const user = await findById(payload.id);
    if(!user){
        return done(notAuthorizedJson, false);
    }
    return done(null, user);
}));

export const generateToken = (data: object) => {
    return jwt.sign(data, JWT_SECRET, {expiresIn: '1h'});

}

export const privateRoute = (req: Request, res: Response, next: NextFunction) =>{
    const authFunction = passport.authenticate('jwt', (err: any, user: User) => {
       req.user = user;
       console.log(user);
       return user ? next() : next(notAuthorizedJson);
    });
    authFunction(req, res, next);
}

export default passport;
