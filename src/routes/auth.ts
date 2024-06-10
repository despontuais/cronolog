import { Router } from "express";
import { login, register, me } from "../controllers/auth";
import { privateRoute } from "../config/passport";
import { RequestHandler } from "express";

const authRoutes: Router = Router();

authRoutes.post("/register", register as RequestHandler);
authRoutes.post("/login", login as RequestHandler);
authRoutes.get("/me", privateRoute, me as RequestHandler);

export default authRoutes;
