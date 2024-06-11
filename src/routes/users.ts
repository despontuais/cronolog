import { Router, RequestHandler } from "express";
import { ping, getUser, listUsers } from '../controllers/users';
import { privateRoute } from "../config/passport";
const userRoutes: Router = Router();

userRoutes.get("/ping", ping as RequestHandler);
userRoutes.get("/users/:id", getUser as RequestHandler);
userRoutes.get("/users", privateRoute, listUsers as RequestHandler);

export default userRoutes;
