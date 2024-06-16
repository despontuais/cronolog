import passport from "passport";
import { JWT_SECRET } from "../secrets";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { findById } from "../services/UserService";
import { Request, Response, NextFunction } from "express";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import logger from "../libs/logger";

/* eslint-disable @typescript-eslint/no-unsafe-call */

const notAuthorizedJson = { status: 401, message: "Not Authorized" };

const cookieExtractor = function(req: Request) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['authToken'];
    }
    return token;
};

const options = {
  // substituí o bearer por um header "Authorization" na request
  jwtFromRequest: cookieExtractor,
  secretOrKey: JWT_SECRET,
  ignoreExpiration: false,
};


passport.use(
  new JWTStrategy(options, (payload: User, done) => {
    (async () => {
      try {
        const user = await findById(payload.id);
        if (!user) {
          done(notAuthorizedJson, false);
          return;
        }
        done(null, user);
        return;
      } catch (err) {
        done(err, false);
        return;
      }
    })().catch((err: unknown) => {
      logger.error(err);
    });
  }),
);

export const generateToken = (data: object) => {
  return jwt.sign(data, JWT_SECRET, { expiresIn: "1h" });
};

export const privateRoute = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate("jwt", (err: Error | null, user: User) => {
    req.user = user;
    user ? next() : next(notAuthorizedJson);
  })(req, res, next);
};

export default passport;
